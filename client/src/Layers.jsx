import './layers.css';
import { useEffect, useState } from 'react';
import { Canvas } from 'fabric';

function Layers({ canvas }) {
    const [layers, setLayers] = useState([]);

    const addId = (obj) => {
        if (!obj.zId) {
            let time = new Date().getTime();
            obj.zId = `${obj.type}_${time}`;
        }
    };

    Canvas.prototype.updateZ = function () {
        let objects = this.getObjects();
        objects.forEach((obj, idx) => {
            addId(obj);
            obj.zIdx = idx;
        });
    };

    const updateLayer = () => {
        if (canvas) {
            canvas.updateZ();
            let objects = canvas
                .getObjects()
                .map((obj) => ({
                    id: obj.id,
                    zIdx: obj.zIdx,
                    type: obj.type
                }));

            console.log('Updating layers:', objects);  // Check if objects are correctly fetched
            setLayers(objects.reverse());  // Update state with reversed layers
        }
    };

    useEffect(() => {
        if (canvas) {
            canvas.on('object:modified', updateLayer);
            canvas.on('object:removed', updateLayer);
            canvas.on('object:added', updateLayer);

            // Initial layer update
            updateLayer();

            // Cleanup listeners
            return () => {
                canvas.off('object:modified', updateLayer);
                canvas.off('object:removed', updateLayer);
                canvas.off('object:added', updateLayer);
            };
        }
    }, [canvas]);

    useEffect(() => {
        console.log('Layers state updated:', layers);  // Log updated layers
    }, [layers]);

    return (
        <div className="layer-panel">
            Layers
            <ul>
                {layers.length > 0 ? (
                    layers.map((el) => (
                        <li key={el.id}>{el.type}{el.id}</li>
                    ))
                ) : (
                    <li>No Elements there</li> 
                )}
            </ul>
        </div>
    );
}

export default Layers;
