import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './landingpage.css';
import { Button } from "@/components/ui/button"
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

function LandingPage() {
  const navigate = useNavigate();
  let [forget, setForget] = useState(false);

  const getSignindetails = async (event) => {
    event.preventDefault();
    let formData = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value
    }
    
    let data = await axios.post('/create', formData);
    console.log(data.data);
    navigate('/validate', {
      state: {
        mail: data.data.mail,
        otp: data.data.otp,
        is_forget: data.data.is_forget
      }
    })
  }

  const getLoginDetails = async (event) => {
    console.log('function called');
    event.preventDefault();
    
    let formData = {
      email: event.target[0].value,
      password: event.target[1].value
    }

    let res = await axios.post('/login', formData);
    if(res.data) {
      console.log("correct password");
      navigate('/canvas');
    } else {
      console.log("wrong password");
      window.alert("wrong password");
    }
  }

  const handleForget = async (event) => {
    event.preventDefault();
    let data = {
      mail: event.target[0].value
    }

    let res = await axios.post('/forget', data);
    console.log(res.data);
    navigate('/validate', {
      state: {
        mail: res.data.mail,
        otp: res.data.otp,
        if_forget: res.data.is_forget
      }
    })
  }

    return (
      <div className="land">
        <img src="https://i.ibb.co/RDMkY25/text-logo-color.png" alt="" />
        <br /> <br /> <br />
        <p className="tagline">
          Design. Create. Inspire. Welcome to Desx - Your Ultimate UI
          Playground! Unleash your creativity, bring your ideas to life, and
          craft stunning web interfaces effortlessly with our powerful tools and
          seamless experience.
        </p>
        <br />
        <div className="button-box">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">Sign up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={getSignindetails}>
                <DialogHeader>
                  <DialogTitle>Welcome !</DialogTitle>
                  <DialogDescription>
                    Enter relevant e-mail account and create a strong password
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Create Password
                    </Label>
                    <Input
                      id="password"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Account</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline">
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={getLoginDetails}>
                <DialogHeader>
                  <DialogTitle>Welcome Back!</DialogTitle>
                  <DialogDescription>
                    Enter your e-mail account and password
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" defaultValue="" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      defaultValue=""
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => {setForget(true)}}>Forget password?</Button>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* forget password */}
          <Dialog open={forget} onOpenChange={setForget}>
            <DialogTrigger>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleForget}>
                <DialogHeader>
                  <DialogTitle>Enter your email</DialogTitle>
                  <DialogDescription>
                    An OTP will be sen to your email address
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" defaultValue="" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
}

export default LandingPage;