import { useState, useRef, useEffect } from "react";
import { Canvas, Circle, Rect, IText, Line, Image, Triangle } from "fabric";
import ToolBar from "./ToolBar";
import "./canvaspage.css";
import Settings from "./Settings";
import { handleObjectMoving, clearGuidelines } from "./Snapping";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layers from "./Layers";

import generater from "./generate";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://desx-server.onrender.com";
const IMG_API_KEY = import.meta.env.VITE_IMG_API;

function CanvasPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [open, setOpen] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [isSave, setIsSave] = useState(true);
  const fileInputRef = useRef(null);
  const [guideLines, setGuideLines] = useState([]);

  const [layerPan, setLayerPan] = useState([]);
  const { name, canvasJSON } = location.state || {};

  let z_index = -1;
  
  useEffect(() => {
    if (canvasRef.current) {

      const setZidx = (obj) => {
        obj.z_index = ++z_index;
        layerPan.unshift(obj.type);
        setLayerPan(layerPan);
      }

      setTimeout(() => {
        setIsSave(true);
      }, 100);
      const initCanvas = new Canvas(canvasRef.current, {
        width: 1000,
        height: 500,
      });

      initCanvas.backgroundColor = "#ffffff";
      initCanvas.loadFromJSON(canvasJSON);
      initCanvas.renderAll();

      setCanvas(initCanvas);

      initCanvas.on("object:moving", (event) => {
        handleObjectMoving(initCanvas, event.target, guideLines, setGuideLines);
        setIsSave(false);
      });

      initCanvas.on("object:modified", () => {
        clearCanvas(initCanvas);
        setIsSave(false);
      });

      initCanvas.on("object:added", (e) => {
        if(e.target && e.target.type != "line") {
          setZidx(e.target);
          console.log(layerPan);
          initCanvas.renderAll();
          setIsSave(false);
        }
      });

      initCanvas.on("object:removed", () => {
        setIsSave(false);
      });

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const addRect = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        height: 50,
        width: 100,
        fill: "#041fa4",
        stroke: "#000000",
        strokeWidth: 2,
      });

      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const cir = new Circle({
        top: 100,
        left: 100,
        radius: 50,
        fill: "#041fa4",
        stroke: "#000000",
        strokeWidth: 2,
      });

      canvas.add(cir);
      canvas.setActiveObject(cir);
    }
  };

  const addText = () => {
    if (canvas) {
      const text = new IText("Text", {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: "black",
        fontFamily: "Arial",
        editable: true,
      });

      canvas.add(text);
      canvas.setActiveObject(text);
    }
  };

  const addLineTool = () => {
    if (canvas) {
      let isDrawing = false;
      let line;

      canvas.on("mouse:down", (event) => {
        isDrawing = true;
        const pointer = canvas.getPointer(event.e);
        const points = [pointer.x, pointer.y, pointer.x, pointer.y];

        line = new Line(points, {
          stroke: "black", // Line color
          strokeWidth: 2, // Line thickness
          selectable: true, // Allow selection of the line later
          originX: "center",
          originY: "center",
        });

        canvas.add(line);
      });

      canvas.on("mouse:move", (event) => {
        if (!isDrawing) return;
        const pointer = canvas.getPointer(event.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        canvas.renderAll();
      });

      canvas.on("mouse:up", () => {
        isDrawing = false;
        line.setCoords(); // Sets final position and allows interaction
        canvas.off("mouse:down"); // Disable drawing if needed
        canvas.off("mouse:move");
      });
    }
  };

  const getUrl = async (src) => {
    const formData = new FormData();
    formData.append("image", src.split(",")[1]);
    let url =  await axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${IMG_API_KEY}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return url.data.data.url;
  }

  const addImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const imgURL = e.target.result;
        let imageEl = document.createElement("img");
        imageEl.src = imgURL;
        imageEl.onload = async () => {
          let image = new Image(imageEl);
          image.set({scaleY: (100/image.height)});
          let newWidth = image.width/image.height*100;
          image.set({scaleX: newWidth/image.width});
          let htmlSrc = await getUrl(image._element.src);
          image.set({htmlSrc: htmlSrc});
          console.log(image);
          canvas.add(image);
          console.log(image.htmlSrc);
          canvas.centerObject(image);
          canvas.setActiveObject(image);
        };
      };
    }
  };

  const addTriangle = () => {
    if (canvas) {
      const tri = new Triangle({
        top: 100,
        left: 50,
        height: 100,
        width: 100,
        fill: "#041fa4",
        stroke: "#000000",
        strokeWidth: 2,
      });

      canvas.add(tri);
    }
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.getObjects().forEach((obj) => {
        canvas.remove(obj); // Removes all objects from the canvas
      });
      canvas.renderAll();
    }
  };

  const saveCanvasAsImage = () => {
    const dataUrl = canvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas_image.png";
    link.click();
  };

  const save = async () => {
    const canvasState = canvas.toJSON();
    let canvasData = {
      name: { name },
      state: canvasState,
      time: new Date(Date.now()),
    };
    let isSaved = await axios.post(`${BASE_URL}/updatecanvas`, canvasData, {
      withCredentials: true
    });
    if (isSaved.data) {
      setOpen(true);
      setIsSave(true);
      setTimeout(() => setOpen(false), 5000);
    }
  };

  const deleteCanvas = async () => {
    let res = await axios.post(`${BASE_URL}/deletecanvas`, { name: name }, {
      withCredentials: true
    });
    navigate("/home");
  };

  const isSaved = () => {
    if (!isSave) {
      setIsBack(true);
    } else {
      navigate("/home");
    }
  };

  const generate = () => {
    const canvasState = canvas.getObjects();
    console.log(generater(canvasState));
  }

  return (
    <div className="page">
      <div className="mainSec">
        <div className="header">
          <ArrowBackIosRoundedIcon
            style={{ color: "#ffffff" }}
            onClick={isSaved}
          />
          &nbsp;&nbsp;&nbsp;
          <h1
            style={{
              color: "white",
              fontSize: 25,
            }}
          >
            {name}
          </h1>
        </div>{" "}
        <br />
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="success"
            style={{
              position: "absolute",
              bottom: "25px",
              textAlign: "center",
            }}
          >
            Canvas saved
          </Alert>
        </Collapse>
        <canvas id="canvas" ref={canvasRef}></canvas>
        <ToolBar
          addCircle={addCircle}
          addRect={addRect}
          addText={addText}
          addLine={addLineTool}
          handleImageUpload={addImage}
          addTriangle={addTriangle}
          clear={clearCanvas}
          download={saveCanvasAsImage}
          save={save}
          deleteCanvas={() => setIsDel(true)}
          generate={generate}
        />
      </div>
     
     <div className="side-container">
      <Settings canvas={canvas} changeState={() => setIsSave(false)} />
      <Layers canvas={canvas} />
     </div>
     
      {/* for deletion */}
      <AlertDialog open={isDel} onOpenChange={setIsDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the whole 
              canvas and canvas data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setIsDel(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteCanvas}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* for saving */}
      <AlertDialog open={isBack} onOpenChange={setIsBack}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your changes will be unsaved</AlertDialogTitle>
            <AlertDialogDescription>
              Please save your changes before going back.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                navigate("/home");
              }}
            >
              Don't Save
            </Button>
            <Button
              onClick={() => {
                save();
                navigate("/home");
              }}
            >
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CanvasPage;
