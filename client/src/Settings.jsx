import { Rect } from 'fabric';
import { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import './settings.css';

function Settings({ canvas }) {
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

            const handleKeyDown = (event) => {
                if (event.key === "Delete" && selectedObject) {
                    deleteSelectedObject();
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [canvas, selectedObject]);

    const handleObjectSelection = (object) => {
        if (!object) {
            return;
        }

        setSelectedObject(object);

        if(object.type === 'rect') {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setRadius("");
            setColor(object.fill);
        } else if (object.type === 'circle') {
            setWidth("");
            setHeight("");
            setRadius(Math.round(object.radius * object.scaleX));
            setColor(object.fill);
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
        }
    };

    const deleteSelectedObject = () => {
        console.log('triggered');
        if (selectedObject) {
            canvas.remove(selectedObject);
            setSelectedObject(null);
            canvas.discardActiveObject();
            canvas.renderAll();
        }
    };

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

    return (
        <>
            <div className="setting">
                {selectedObject && selectedObject.type === 'rect' && (
                    <>
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
                        <label for="exampleColorInput" class="form-label">Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                    </>
                )}

                {selectedObject && selectedObject.type === 'circle' && (
                    <>
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
                        <label for="exampleColorInput" class="form-label">Color</label>
                        <input type="color" class="form-control form-control-color" id="exampleColorInput" value={color} title="Choose your color" onChange={handleColorChange}/>
                    </>
                )}

                {selectedObject && selectedObject.type === 'i-text' && (
                    <>
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

            </div>
        </>
    )
}

export default Settings;