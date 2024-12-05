import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./components/ui/button";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

const BASE_URL = "https://desx-server.onrender.com";

function SetPass() {
    const location = useLocation();
    const navigate = useNavigate();
    let [eyeOpen, setEyeOpen] = useState(true);
    let [hide, setHide] = useState("password");
    let [isOpen, setIsOpen] = useState(false);
    let {mail} = location.state || {};
 
    const toggleEye = () => {
        setEyeOpen(!eyeOpen);
    }

    const toggleVisibilty = () => {
        if(hide == "password") {
            setHide("text");
        } else {
            setHide("password");
        }

        toggleEye();
    }

    const resetPassword = async (event) => {
        event.preventDefault();
        let data = {
            mail: mail,
            newPass: event.target[0].value
        }
        let res = await axios.post(`${BASE_URL}/updatepassword`, data, {
          withCredentials: true
        });
        if(res.data == "updated") {
            setIsOpen(true);
        }
    }

    return (
      <div>
        <h1 style={{ fontSize: "50px" }}>Set your new password</h1> <br /><br />
        <form onSubmit={resetPassword}>
            <Input style={{
                width: 300,
                display: "inline"
            }} type={hide} id="newpass" placeholder="New Password" /> &nbsp;
            {
                (eyeOpen)? <VisibilityOutlinedIcon onClick={toggleVisibilty}/>: <VisibilityOffOutlinedIcon onClick={toggleVisibilty}/>
            }
            <br /> <br />
            <Button type="submit">Set</Button>
        </form>

        {/* Alert message */}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Password has reset</AlertDialogTitle>
              <AlertDialogDescription>
                Kindly 'Login' with your new password.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={
                () => {navigate("/")}
              }>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
}

export default SetPass;