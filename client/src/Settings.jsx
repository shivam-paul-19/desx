import { Rect } from 'fabric';
import { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './settings.css';

function Settings({ canvas }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [radius, setRadius] = useState("");
    const [color, setColor] = useState("");

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
        }
    }, [canvas]);

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
        }
    };

    const clearSettings = () => {
        setRadius("");
        setColor("");
        setWidth("");
        setHeight("");
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
            selectedObject.set({ fill: value });
            canvas.renderAll();
        }
    }

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
            </div>
        </>
    )
}

export default Settings;