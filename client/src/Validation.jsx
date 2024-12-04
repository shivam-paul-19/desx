import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./components/ui/button";

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

function Validate() {
    const navigate = useNavigate();
    const location = useLocation();
    let {name, mail, otp, is_forget, pass} = location.state || {};
    let [isOpen, setIsOpen] = useState(false);
    let [wrongOTP, setWrongOTP] = useState(false);

    const checkOTP = async (event) => {
        event.preventDefault();
        let enteredOTP = event.target[0].value;
        if(otp == enteredOTP) {
            console.log("verification done");
            setIsOpen(true);
            let data = {
              name: name,
              mail: mail,
              pass: pass
            }
            console.log(is_forget);
            if(!is_forget) {
              await axios.post('/adduser', data);
            } else {
              navigate('/password', {
                state: {
                  mail: data.mail
                }
              });
            }
        } else {
            console.log("OTP don't match");
            setWrongOTP(true);
        }
    };

    return (
      <>
        <h1 style={{ fontSize: "50px" }}>Enter OTP</h1>
        <br />
        <p>An OTP is sent to your entered email address {mail}</p>
        <br />
        <form action="" onSubmit={checkOTP}>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <br />
          <Button type="submit">Sumbit</Button>
        </form>

        {/* Alert message */}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Account Created</AlertDialogTitle>
              <AlertDialogDescription>
                Kindly 'Login' with your account details.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={
                () => {navigate('/')}
              }>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Wrong OTP */}
        <AlertDialog open={wrongOTP} onOpenChange={setWrongOTP}>
          <AlertDialogTrigger></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Wrong OTP</AlertDialogTitle>
              <AlertDialogDescription>
                the OTP you have entered doesn't match
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={
                () => {navigate('/')}
              }>Go back to main page</Button>
              <Button onClick={
                () => {setWrongOTP(false)}
              }>Enter again</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
}

export default Validate;