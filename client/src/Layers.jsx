import "./layers.css";
import { useEffect, useState } from "react";
import { Canvas } from "fabric";

import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

function Layers({ canvas }) {
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);

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
      let objects = canvas.getObjects().map((obj) => ({
        id: obj.id,
        zIdx: obj.zIdx,
        zId: obj.zId,
        type: obj.type,
      }));

      setLayers(objects.reverse()); // Update state with reversed layers
    }
  };

  const handleObjectSelection = (e) => {
    const selected = e.selected ? e.selected[0] : null;
    if (selected) {
      setSelectedLayer(selected.zId);
    } else {
      setSelectedLayer(null);
    }
  };

  const selectLayerInCanvas = (layerId) => {
    const object = canvas.getObjects().find((obj) => obj.zId === layerId);

    if (object) {
      canvas.setActiveObject(object);
      canvas.renderAll();
    }
  };

  const moveSelectedObjects = (dir) => {
    if (!selectedLayer) {
      return;
    }

    const objects = canvas.getObjects();
    const obj = objects.find((obj) => obj.zId === selectedLayer);

    if (obj) {
      const currIdx = objects.indexOf(obj);

      if (dir === "up" && currIdx < objects.length - 1) {
        const temp = objects[currIdx];
        objects[currIdx] = objects[currIdx + 1];
        objects[currIdx + 1] = temp;
      } else if (dir === "down" && currIdx > 0) {
        const temp = objects[currIdx];
        objects[currIdx] = objects[currIdx - 1];
        objects[currIdx - 1] = temp;
      }
    }

    const bg = canvas.backgroundColor;
    canvas.clear();

    objects.forEach((el) => canvas.add(el));
    canvas.backgroundColor = bg;
    canvas.renderAll();

    objects.forEach((obj, idx) => {
      addId(obj);
      obj.zIdx = idx;
    });

    canvas.setActiveObject(obj);
    canvas.renderAll();
    updateLayer();
  };

  useEffect(() => {
    if (canvas) {
      canvas.on("object:modified", updateLayer);
      canvas.on("object:removed", updateLayer);
      canvas.on("object:added", updateLayer);

      canvas.on("selection:created", handleObjectSelection);
      canvas.on("selection:updated", handleObjectSelection);
      canvas.on("selection:cleared", () => setSelectedLayer(null));

      // Initial layer update
      updateLayer();

      // Cleanup listeners
      return () => {
        canvas.off("object:modified", updateLayer);
        canvas.off("object:removed", updateLayer);
        canvas.off("object:added", updateLayer);
        canvas.on("selection:created", handleObjectSelection);
        canvas.on("selection:updated", handleObjectSelection);
        canvas.on("selection:cleared", () => setSelectedLayer(null));
      };
    }
  }, [canvas]);

  return (
    <div className="layer-panel">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Layers
        <div>
          <KeyboardArrowUpOutlinedIcon
            onClick={() => moveSelectedObjects("up")}
          />
          &nbsp;
          <KeyboardArrowDownOutlinedIcon
            onClick={() => moveSelectedObjects("down")}
          />
        </div>
      </div>
      <hr />
      <ul>
        {layers.length > 0 ? (
          layers.map((el) => (
            <li
              key={el.id}
              onClick={() => selectLayerInCanvas(el.zId)}
              className={el.zId == selectedLayer ? "selected" : "non_selected"}
            >
              {el.type == 'i-text'? "Text": el.type}
              {el.id}
            </li>
          ))
        ) : (
          <li>No Elements there</li>
        )}
      </ul>
    </div>
  );
}

export default Layers;