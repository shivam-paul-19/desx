import { useEffect } from "react";
import axios from "axios";
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

const createNewCanvas = async (event) => {
    event.preventDefault();
    let data = {
        name: event.target[0].value
    }
    console.log(event.target[0].value);
    await axios.post('/addcanvas', data);
}

function Home() {
    const location = useLocation();
    let {name} = location.state || {};
    return (
        <div className="home_page">
            <img id="home_img" src="https://i.ibb.co/RDMkY25/text-logo-color.png" alt="" />
            <h1 id="welcome">Welcome {name}</h1>
            
            <Dialog>
            <DialogTrigger asChild>
              <Button>New Canvas</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={createNewCanvas}>
                <DialogHeader>
                  <DialogTitle>Creating a new canvas</DialogTitle>
                  <DialogDescription>
                    Enter a name for the canvas
                  </DialogDescription>
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
        </div>
    )
}

export default Home;