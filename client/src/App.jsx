import { useState, useRef, useEffect } from 'react'
import { Canvas, Circle, Rect, IText, Line } from 'fabric'
import ToolBar from './ToolBar';
import './App.css'
import Settings from './Settings';

function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if(canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 1000,
        height: 500
      });

      initCanvas.backgroundColor = '#ffffff';
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      }
    }
  }, []);

  const addRect = () => {
    if(canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        height: 50,
        width: 100,
        fill: "#000000"
      });

      canvas.add(rect);
    }
  }

  const addCircle = () => {
    if(canvas) {
      const cir = new Circle({
        top: 100,
        left: 100,
        radius: 50,
        fill: "#000000"
      });

      canvas.add(cir);
    }
  }

  const addText = () => {
    if(canvas) {
      const text = new IText('Text', {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: 'black',
        fontFamily: 'Arial',
        editable: true,
      });

      canvas.add(text);
      canvas.setActiveObject(text);
    }
  }

  const addLineTool = () => {
      if (canvas) {
          let isDrawing = false;
          let line;

          canvas.on('mouse:down', (event) => {
              isDrawing = true;
              const pointer = canvas.getPointer(event.e);
              const points = [pointer.x, pointer.y, pointer.x, pointer.y];

              line = new Line(points, {
                  stroke: 'black',       // Line color
                  strokeWidth: 2,        // Line thickness
                  selectable: true,      // Allow selection of the line later
                  originX: 'center',
                  originY: 'center'
              });

              canvas.add(line);
          });

          canvas.on('mouse:move', (event) => {
              if (!isDrawing) return;
              const pointer = canvas.getPointer(event.e);
              line.set({ x2: pointer.x, y2: pointer.y });
              canvas.renderAll();
          });

          canvas.on('mouse:up', () => {
              isDrawing = false;
              line.setCoords();  // Sets final position and allows interaction
              canvas.off('mouse:down'); // Disable drawing if needed
              canvas.off('mouse:move');
          });
      }
  };

  // const activatePenTool = () => {
  //   if (canvas) {
  //       canvas.isDrawingMode = true;

  //       const pen = new PencilBrush(canvas);
  //       pen.color = '#000000'; // Set default color
  //       pen.width = 5; // Set default brush width
  //       pen.dashArray = []; // Solid line by default
  //       canvas.renderAll();
  //   }
  // };

  return (
    <div className='page'>
      <div className="mainSec">
        <canvas id='canvas' ref={canvasRef}></canvas>
        <ToolBar addCircle={addCircle} addRect={addRect} addText={addText} addLine={addLineTool}/>
      </div>
      <Settings canvas={canvas} />
    </ div>
  )
}

export default App
