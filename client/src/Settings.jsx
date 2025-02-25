import { Circle, Rect, IText, Triangle, Line } from 'fabric';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './settings.css';

let copiedObj = null;

function Settings({ canvas, changeState }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [radius, setRadius] = useState("");
    const [color, setColor] = useState("");
    const [fontSize, setFontSize] = useState(24);
    const [fontFamily, setFontFamily] = useState("Arial");
    const [textAlign, setTextAlign] = useState("left");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [lineLength, setLineLength] = useState("");
    const [lineWidth, setLineWidth] = useState("");
    const [lineColor, setLineColor] = useState("#000000");
    const [lineStyle, setLineStyle] = useState("solid");
    const [imageHeight, setImageHeight] = useState("");
    const [imageWidth, setImageWidth] = useState("");
    const [triangleWidth, setTriangleWidth] = useState('');
    const [triangleHeight, setTriangleHeight] = useState('');
    const [strokeWidth, setStrokeWidth] = useState('');
    const [strokeColor, setStrokeColor] = useState('');
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(1000);

    useEffect(() => {
        if(canvas) {
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:updated", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:cleared", (event) => {
                setSelectedObject(null);
                clearSettings();
            });

            canvas.on("selection:modified", (event) => {
                handleObjectSelection(event.target);
            });
            
            canvas.on("selection:scaling", (event) => {
                handleObjectSelection(event.target);
            });

            canvas.setHeight(canvasHeight);
            canvas.setWidth(canvasWidth);
            canvas.renderAll();

            const handleKeyDown = (event) => {
                if (event.key === "Delete" && selectedObject) {
                    deleteSelectedObject(selectedObject);
                } else if (event.ctrlKey && event.key === 'c') {
                    copiedObj = copyObject();
                } else if (event.ctrlKey && event.key === 'x') {
                    copiedObj = copyObject();
                    deleteSelectedObject(selectedObject);
                    console.log(copiedObj);
                } else if (event.ctrlKey && event.key === 'v') {
                    pasteObj(copiedObj);
                    copiedObj = null;
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };

        }
    }, [canvas, selectedObject, canvasHeight, canvasWidth]);

    const handleObjectSelection = (object) => {
        if (!object) {
            setSelectedObject(canvas);
            return;
        }

        setSelectedObject(object);

        if(object.type === 'rect') {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setRadius("");
            setColor(object.fill);
            setStrokeWidth(object.strokeWidth);
            setStrokeColor(object.stroke);
        } else if (object.type === 'circle') {
            setWidth("");
            setHeight("");
            setRadius(Math.round(object.radius * object.scaleX));
            setColor(object.fill);
            setStrokeWidth(object.strokeWidth);
            setStrokeColor(object.stroke);
        } else if (object.type === 'i-text') {
            setWidth("");
            setHeight("");
            setRadius("");
            
            setFontSize(object.fontSize || 24);
            setFontFamily(object.fontFamily || 'Arial');
            setTextAlign(object.textAlign || 'left');
            setColor(object.fill || 'black');
        } else if (object.type === 'line') {
            const length = Math.sqrt(
                Math.pow(object.x2 - object.x1, 2) + Math.pow(object.y2 - object.y1, 2)
            );
    
            setLineLength(Math.round(length));
            setLineWidth(object.strokeWidth || 2);
            setLineColor(object.stroke || '#000000');
            setLineStyle('solid');
        } else if (object.type === 'image') {
            setImageWidth(Math.round(object.width * object.scaleX));
            setImageHeight(Math.round(object.height * object.scaleY));
            setRadius("");
        } else if (object.type === 'triangle') {
            setTriangleWidth(Math.round(object.width * object.scaleX));
            setTriangleHeight(Math.round(object.height * object.scaleY));
            setRadius("");
            setStrokeWidth(object.strokeWidth);
            setStrokeColor(object.stroke);
        } else {
            setCanvasHeight(object.height);
            setCanvasWidth(object.width);
        }
    };

    const deleteSelectedObject = (selectedObject) => {
        canvas.remove(selectedObject);
        setSelectedObject(null);
        canvas.discardActiveObject();
        canvas.renderAll(); 
    };

    const copyObject = () => {
        if (selectedObject) {
            if(selectedObject.type === 'rect') {
                const newRect = new Rect({
                    top: 100,
                    left: 100,
                    fill: selectedObject.fill,
                    height: selectedObject.height,
                    width: selectedObject.width,
                    stroke: selectedObject.stroke,
                    strokeWidth: selectedObject.strokeWidth
                })
    
                return newRect;

            } else if (selectedObject.type === 'circle') {
                const newCircle = new Circle({
                    top: 100,
                    left: 100,
                    fill: selectedObject.fill,
                    radius: selectedObject.radius,
                    stroke: selectedObject.stroke,
                    strokeWidth: selectedObject.strokeWidth
                })
    
                return newCircle;

            } else if (selectedObject.type === 'i-text') {
                const newText = new IText(selectedObject.text, {
                    left: 100,
                    top: 100,
                    fontSize: selectedObject.fontSize,
                    fill: selectedObject.fill,
                    fontFamily: selectedObject.fontFamily,
                    editable: true
                });

                return newText;

            } else if (selectedObject.type === 'triangle') {
                const newTri = new Triangle({
                    top: 100,
                    left: 50,
                    height: selectedObject.height,
                    width: selectedObject.width,
                    fill: selectedObject.fill,
                    stroke: selectedObject.stroke,
                    strokeWidth: selectedObject.strokeWidth
                });

                return newTri;

            } else if (selectedObject.type === 'line') {
                const newLine = new Line([selectedObject.x1, selectedObject.y1, selectedObject.x2, selectedObject.y2], {
                    top: 100,
                    left: 100,
                    stroke: selectedObject.stroke,
                    strokeWidth: selectedObject.strokeWidth
                });

                return newLine;
            }
        }
    }

    const pasteObj = (copiedObj) => {
        if(copiedObj == null) {
            return;
        }

        canvas.add(copiedObj);
    }

    const clearSettings = () => {
        setRadius("");
        setColor("");
        setWidth("");
        setHeight("");
        setFontSize(24);
        setFontFamily("Arial");
        setTextAlign("left");
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setHeight(intValue);

        if (selectedObject && selectedObject.type === 'rect' && intValue >= 0) {
            selectedObject.set({height: intValue/selectedObject.scaleY});
            canvas.renderAll();
        }
    }

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setWidth(intValue);

        if (selectedObject && selectedObject.type === 'rect' && intValue >= 0) {
            selectedObject.set({width: intValue/selectedObject.scaleX});
            canvas.renderAll();
        }
    }

    const handleRadiusChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setRadius(intValue);

        if (selectedObject && selectedObject.type === 'circle' && intValue >= 0) {
            selectedObject.set({radius: intValue/selectedObject.scaleX});
            canvas.renderAll();
        }
    }

    const handleColorChange = (e) => {
        const value = e.target.value.replace(/,/g, "");

        setColor(value);

        
        if(selectedObject) {
            if (selectedObject.type === 'line') {
                selectedObject.set({ stroke: color });
            } else {
                selectedObject.set({ fill: value });
            }
            canvas.renderAll();
        }

        changeState();
    };

    const handleFontSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setFontSize(newSize);
        if (selectedObject && selectedObject.type === 'i-text') {
            selectedObject.set({ fontSize: newSize });
            canvas.renderAll();
        }
    };

    const handleFontFamilyChange = (e) => {
        const newFont = e.target.value;
        setFontFamily(newFont);
        if (selectedObject && selectedObject.type === 'i-text') {
            selectedObject.set({ fontFamily: newFont });
            canvas.renderAll();
        }
    };

    const handleTextAlignChange = (e) => {
        const newAlign = e.target.value;
        setTextAlign(newAlign);
        if (selectedObject && selectedObject.type === 'i-text') {
            selectedObject.set({ textAlign: newAlign });
            canvas.renderAll();
        }
    };

    const handleTextFormatChange = (formatType, isChecked) => {
        if (selectedObject && selectedObject.type === 'i-text') {
          switch (formatType) {
            case 'bold':
              setIsBold(isChecked);
              selectedObject.set('fontWeight', isChecked ? 'bold' : 'normal');
              break;
            case 'italic':
              setIsItalic(isChecked);
              selectedObject.set('fontStyle', isChecked ? 'italic' : 'normal');
              break;
            case 'underline':
              setIsUnderline(isChecked);
              selectedObject.set('underline', isChecked);
              break;
            default:
              break;
          }
          canvas.renderAll();
        }
    };
      
    const handleLineLengthChange = (e) => {
        const newLength = parseInt(e.target.value, 10);
        setLineLength(newLength);
    
        if (selectedObject && selectedObject.type === 'line') {
            const angle = Math.atan2(selectedObject.y2 - selectedObject.y1, selectedObject.x2 - selectedObject.x1);
            selectedObject.set({
                x2: selectedObject.x1 + newLength * Math.cos(angle),
                y2: selectedObject.y1 + newLength * Math.sin(angle),
            });
            canvas.renderAll();
        }
    };
    
    const handleLineWidthChange = (e) => {
        const newWidth = parseInt(e.target.value, 10);
        setLineWidth(newWidth);
    
        if (selectedObject && selectedObject.type === 'line') {
            selectedObject.set({ strokeWidth: newWidth });
            canvas.renderAll();
        }
    };

    const handleStrokeWidthChange = (e) => {
        const newStrokeWidth = parseInt(e.target.value, 10);
        setStrokeWidth(newStrokeWidth);

        if(selectedObject) {
            selectedObject.set({ strokeWidth: newStrokeWidth });
            canvas.renderAll();
        }
    }

    const handleStrokeColorChange = (e) => {
        const newStrokeColor = e.target.value;
        setStrokeColor(newStrokeColor);

        if(selectedObject && selectedObject.strokeWidth > 0) {
            selectedObject.set({ stroke: newStrokeColor });
            canvas.renderAll();
        }
    }

    const handleLineStyleChange = (e) => {
        const style = e.target.value;
        setLineStyle(style);
    
        if (selectedObject && selectedObject.type === 'line') {
            if (style === "solid") {
                selectedObject.set({ 
                    strokeDashArray: [], 
                    strokeLineCap: "butt" // Normal line end for solid
                });
            } else if (style === "dotted") {
                selectedObject.set({ 
                    strokeDashArray: [1, 10], // Short dashes with gaps to look like dots
                    strokeLineCap: "round"  // Rounded ends for the dot effect
                });
            } else if (style === "dashed") {
                selectedObject.set({ 
                    strokeDashArray: [10, 10], // Longer dashes and gaps
                    strokeLineCap: "butt"     // Normal line end for dashed lines
                });
            }
            canvas.renderAll();
        }
    };       

    const handleImageHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setImageHeight(intValue);

        if (selectedObject && selectedObject.type === 'image' && intValue >= 0) {
            const newScaleY = intValue / selectedObject.height;
            selectedObject.set({ scaleY: newScaleY });
            canvas.renderAll();
        }
    }

    const handleImageWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setImageWidth(intValue);

        if (selectedObject && selectedObject.type === 'image' && intValue >= 0) {
            const newScaleX = intValue / selectedObject.width;
            selectedObject.set({ scaleX: newScaleX });
            canvas.renderAll();
        }
    }

    const handleTriangleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setTriangleHeight(intValue);

        if (selectedObject && selectedObject.type === 'triangle' && intValue >= 0) {
            selectedObject.set({height: intValue/selectedObject.scaleY});
            canvas.renderAll();
        }
    }

    const handleTriangleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);

        setTriangleWidth(intValue);

        if (selectedObject && selectedObject.type === 'triangle' && intValue >= 0) {
            selectedObject.set({width: intValue/selectedObject.scaleX});
            canvas.renderAll();
        }
    }

    const handleCanvasHeightChange = (e) => {
        const intValue = parseInt(e.target.value);

        if (!selectedObject && intValue >= 0) {
            setCanvasHeight(intValue);
        }
    }

    const handleCanvasWidthChange = (e) => {
        const intValue = parseInt(e.target.value);

        if (!selectedObject && intValue >= 0) {
            setCanvasWidth(intValue);
        }
    }


    return (
        <>
            <div className="setting">
                {selectedObject && selectedObject.type === 'rect' && (
                    <>
                        <h3>Rectangle</h3> <br />
                        <TextField
                            id="outlined-number"
                            label="Height"
                            defaultValue={height}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleHeightChange}
                        /> <br />
                        <TextField
                            id="outlined-number"
                            label="Width"
                            defaultValue={width}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleWidthChange}
                        /> <br />
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label style={{width: 200}} for="exampleColorInput" class="form-label">Fill Color</label>
                            <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                        </div>
                        <br />
                        <TextField
                            id="outlined-number"
                            label="Stroke width"
                            defaultValue={strokeWidth}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleStrokeWidthChange}
                        /> <br />
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label style={{width: 200}} for="exampleColorInput" class="form-label">Stroke Color</label>
                            <input type="color" class="form-control form-control-color" id="exampleColorInput" value={strokeColor} title="Choose your color" onChange={handleStrokeColorChange}/>
                        </div>
                    </>
                )}

                {selectedObject && selectedObject.type === 'circle' && (
                    <>
                        <h3>Circle</h3> <br />
                        <TextField
                            id="outlined-number"
                            label="Radius"
                            defaultValue={radius}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleRadiusChange}
                        /> <br />
                        <label for="exampleColorInput" class="form-label">Fill Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                        <br />
                        <TextField
                            id="outlined-number"
                            label="Stroke width"
                            defaultValue={strokeWidth}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleStrokeWidthChange}
                        /> <br />
                        <label for="exampleColorInput" class="form-label">Stroke Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={strokeColor} title="Choose your color" onChange={handleStrokeColorChange}/>
                    </> 
                )}

                {selectedObject && selectedObject.type === 'i-text' && (
                    <>
                        <h3>Text</h3> <br />
                        {/* Font Size */}
                        <TextField
                            id="outlined-number"
                            label="Font Size"
                            defaultValue={fontSize}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleFontSizeChange}
                            />
                        <br />

                        {/* Font Family */}
                        <TextField
                            id="outlined-select-font"
                            select
                            label="Font Family"
                            defaultValue={fontFamily}
                            onChange={handleFontFamilyChange}
                            >
                            {[
                                'Arial', 
                                'Courier New', 
                                'Georgia', 
                                'Helvetica', 
                                'Lucida Console', 
                                'Tahoma', 
                                'Times New Roman', 
                                'Verdana', 
                                'Comic Sans MS', 
                                'Trebuchet MS', 
                                'Impact', 
                                'Garamond'
                            ].map((font) => (
                                <MenuItem key={font} value={font}>
                                {font}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />

                        {/* Text Formatting */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            fontSize: 12
                        }}>
                            <label>Text Formatting:</label>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '70%'
                            }}>
                                <input
                                type="checkbox"
                                checked={isBold}
                                onChange={(e) => handleTextFormatChange('bold', e.target.checked)}
                                />
                                <label>Bold</label>

                                <input
                                type="checkbox"
                                checked={isItalic}
                                onChange={(e) => handleTextFormatChange('italic', e.target.checked)}
                                />
                                <label>Italic</label>

                                <input
                                type="checkbox"
                                checked={isUnderline}
                                onChange={(e) => handleTextFormatChange('underline', e.target.checked)}
                                />
                                <label>Underline</label>
                            </div>
                        </div> <br />


                        {/* Text Alignment */}
                        <TextField
                            id="outlined-select-align"
                            select
                            label="Alignment"
                            defaultValue={textAlign}
                            onChange={handleTextAlignChange}
                            >
                            {['left', 'center', 'right', 'justify'].map((align) => (
                            <MenuItem key={align} value={align}>
                                {align.charAt(0).toUpperCase() + align.slice(1)}
                            </MenuItem>
                            ))}
                        </TextField> <br />
                        <label for="exampleColorInput" class="form-label">Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                    </>
                )}

                {selectedObject && selectedObject.type === 'line' && (
                    <>
                        <h3>Line</h3> <br />
                        {/* Line Length */}
                        <TextField
                            label="Length"
                            value={lineLength}
                            type="number"
                            onChange={handleLineLengthChange}
                            InputLabelProps={{ shrink: true }}
                        />
                        <br />

                        {/* Line Width */}
                        <TextField
                            label="Width"
                            value={lineWidth}
                            type="number"
                            onChange={handleLineWidthChange}
                            InputLabelProps={{ shrink: true }}
                        />
                        <br />
                        <label className="form-label">Style</label>
                        <select value={lineStyle} onChange={handleLineStyleChange}>
                            <option value="solid">Solid</option>
                            <option value="dotted">Dotted</option>
                            <option value="dashed">Dashed</option>
                        </select>
                        <br />
                        <label for="exampleColorInput" class="form-label">Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                    </>
                )}

                {selectedObject && selectedObject.type === 'image' && (
                    <>  
                        <h3>Image</h3> <br />
                        <TextField
                            id="outlined-number"
                            label="Height"
                            defaultValue={imageHeight}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleImageHeightChange}
                        /> <br />
                        <TextField
                            id="outlined-number"
                            label="Width"
                            defaultValue={imageWidth}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleImageWidthChange}
                        />
                    </>
                )}

                {selectedObject && selectedObject.type === 'triangle' && (
                    <>  
                        <h3>Triangle</h3> <br />
                        <TextField
                            id="outlined-number"
                            label="Height"
                            defaultValue={triangleHeight}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleTriangleHeightChange}
                        /> <br />
                        <TextField
                            id="outlined-number"
                            label="Width"
                            defaultValue={triangleWidth}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleTriangleWidthChange}
                        /> <br />
                        <label for="exampleColorInput" class="form-label">FIll Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                        <br />
                        <TextField
                            id="outlined-number"
                            label="Stroke width"
                            defaultValue={strokeWidth}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleStrokeWidthChange}
                        /> <br />
                        <label for="exampleColorInput" class="form-label">Stroke Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={strokeColor} title="Choose your color" onChange={handleStrokeColorChange}/>
                    </>
                )}

                {!(selectedObject) && (
                    <>
                        <h3>Canvas</h3> <br />
                        <TextField
                            id="outlined-number"
                            label="Height"
                            defaultValue={canvasHeight}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleCanvasHeightChange}
                        /> <br />
                        <TextField
                            id="outlined-number"
                            label="Width"
                            defaultValue={canvasWidth}
                            type="number"
                            slotProps={{
                                inputLabel: {
                                shrink: true,
                                },
                            }}
                            onChange={handleCanvasWidthChange}
                        /> 
                    </>
                )}

            </div>
        </>
    )
}

export default Settings;