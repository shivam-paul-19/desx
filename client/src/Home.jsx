import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './home.css';
import { useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Home() {
  let [canvases, setCanvses] = useState([]);
  let [name, SetName] = useState("User");
  const getCanvas = async () => {
    let canvasNames = await axios.get('/getcanvas');
    canvases = canvasNames.data;
    console.log(canvases);
    setCanvses(canvases);
  }

  const getName = async () => {
    let userName = await axios.get('/getuser');
    SetName(userName.data);
  }

  useEffect(() => {
    getCanvas();
    getName();
  }, []);

  const navigate = useNavigate();

  const createNewCanvas = async (event) => {
    event.preventDefault();
    let data = {
        name: event.target[0].value
    }
    console.log(event.target[0].value);
    let result = await axios.post('/addcanvas', data);
    if(result) {
      navigate('/canvas', {
        state: {
          name: event.target[0].value,
          canvasJSON: { version: '6.4.3', objects: [], background: '#ffffff' }
        }
      });
    }
  }

  const loadCanvas = async (event) => {
    let name = event.target.children[0].innerText;
    let canState = await axios.post('/loadcanvas', {name: name});
    console.log(canState.data);
    navigate('/canvas', {
      state: {
        name: name,
        canvasJSON: canState.data
      }
    });
  }

  const fabStyle = {
    position: 'absolute',
    bottom: 30,
    right: 30,
  };

  const location = useLocation();
  // let {name} = location.state || {};
  return (
    <div className="home_page">
      <img
        id="home_img"
        src="https://i.ibb.co/RDMkY25/text-logo-color.png"
        alt=""
      />
      <h1 id="welcome">Welcome {name}</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Fab sx={fabStyle} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={createNewCanvas}>
            <DialogHeader>
              <DialogTitle>Creating a new canvas</DialogTitle>
              <DialogDescription>Enter a name for the canvas</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" defaultValue="" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    <br />
    <hr />
      {/* canvas list */}
      {
        (canvases.length)? (
          <ul>
        <li><div className="canvas-label-head"><span>Name</span><span>Last updated</span></div></li>
        {canvases.map((c) => {
          let date = new Date(c[1]);
          date = date.toLocaleString('en-IN');
          return (
            <li><div className="canvas-label" onClick={loadCanvas}><span>{c[0]}</span><span>{date}</span></div></li>
          )
        })}
      </ul>
        ) : (
          <div>
            <br />
            <h1 style={{fontSize: "25px", textAlign: "center"}}><i>No saved canvas</i></h1>
          </div>
        )
      }
      
    </div>
  );
}

export default Home;