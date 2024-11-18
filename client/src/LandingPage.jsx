import axios from "axios";

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

const getSignindetails = async (event) => {
    event.preventDefault();
    let formData = {
        email: event.target[0].value,
        password: event.target[1].value
    }
    
    await axios.post('/create', formData);
}

const getLoginDetails = async (event) => {
    event.preventDefault();
    let formData = {
        email: event.target[0].value,
        password: event.target[1].value
    }

    await axios.post('/login', formData);
}

function LandingPage() {
    return (
      <div className="land">
        <img src="https://i.ibb.co/RDMkY25/text-logo-color.png" alt="" />
        <br /> <br /> <br />
        <p className="tagline">
          Design. Create. Inspire. Welcome to Desx - Your Ultimate UI
          Playground! Unleash your creativity, bring your ideas to life, and
          craft stunning web interfaces effortlessly with our powerful tools and
          seamless experience.
        </p>{" "}
        <br />
        <div className="button-box">
          <Dialog>
            <DialogTrigger asChild>
                <Button size='lg'>Sign up</Button>
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
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue=""
                    className="col-span-3"
                  />
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
                <Button size='lg' variant="outline">Login</Button>
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
                  <Input
                    id="email"
                    defaultValue=""
                    className="col-span-3"
                  />
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
                <Button variant="outline">Forget password?</Button>
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