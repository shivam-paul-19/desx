import { useState, useRef, useEffect } from 'react'
import { Canvas, Circle, Rect } from 'fabric'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import IconButton from '@mui/material/IconButton';
import './App.css'

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
        fill: "#00ff00"
      });

      canvas.add(cir);
    }
  }

  return (
    <>
      <div className='toolbar'>
        <IconButton onClick={addRect}>
          <RectangleOutlinedIcon />
        </IconButton>
        <IconButton onClick={addCircle}>
          <CircleOutlinedIcon />
        </IconButton>

      </div>
      <canvas id='canvas' ref={canvasRef}></canvas>
    </>
  )
}

export default App
