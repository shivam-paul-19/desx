import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconButton from '@mui/material/IconButton';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CanvasList from "./CanvasList";

function Home() {
  let [canvases, setCanvses] = useState([]);
  let [name, SetName] = useState("User");
  let [canvasAlert, setCanvasAlert] = useState(false);

  const getCanvas = async () => {
    let canvasNames = await axios.get("/getcanvas");
    canvases = canvasNames.data;
    setCanvses(canvases);
  };

  const getName = async () => {
    let userName = await axios.get("/getuser");
    SetName(userName.data.name);
  };

  useEffect(() => {
    getCanvas();
    getName();
  }, []);

  const navigate = useNavigate();

  const createNewCanvas = async (event) => {
    event.preventDefault();
    let data = {
      name: event.target[0].value,
    };
    let result = await axios.post("/addcanvas", data);
    if (result.data) {
      navigate("/canvas", {
        state: {
          name: event.target[0].value,
          canvasJSON: { version: "6.4.3", objects: [], background: "#ffffff" },
        },
      });
    } else if (result.data == false) {
      setCanvasAlert(true);
    }
  };

  const loadCanvas = async (event) => {
    let name = event.target.children[0].innerText;
    let canState = await axios.post("/loadcanvas", { name: name });
    navigate("/canvas", {
      state: {
        name: name,
        canvasJSON: canState.data,
      },
    });
  };

  const fabStyle = {
    position: "absolute",
    bottom: 30,
    right: 30,
  };

  const userStyle = {
    position: "absolute",
    right: "30px",
    top: "30px",
    color: "white",
    fontSize: "40px"
  }

  const location = useLocation();
  return (
    <div className="home_page">
      <Tooltip TransitionComponent={Zoom} title="User account">
        <AccountCircleIcon sx={userStyle} onClick={() => navigate("/user")} />
      </Tooltip>
      <img
        id="home_img"
        src="https://i.ibb.co/RDMkY25/text-logo-color.png"
        alt=""
      />
      <h1 id="welcome">Welcome {name}</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Tooltip TransitionComponent={Zoom} title="Create new canvas">
            <Fab sx={fabStyle} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
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
      {canvases.length ? (
        <CanvasList canvases={canvases} loadCanvas={loadCanvas} />
      ) : (
        <div>
          <br />
          <h1 style={{ fontSize: "25px", textAlign: "center" }}>
            <i>No saved canvas</i>
            <br />
            <i>Click on '+' to create your first canvas</i>
          </h1>
        </div>
      )}

      {/* unique name alert */}
      <AlertDialog open={canvasAlert} onOpenChange={setCanvasAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a unique name</AlertDialogTitle>
            <AlertDialogDescription>
              A file with this name already exists, kindly set a unique name.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setCanvasAlert(false)}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Home;
