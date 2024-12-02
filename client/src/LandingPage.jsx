import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./landingpage.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LandingPage() {
  const navigate = useNavigate();

  const check = async () => {
    try {
      console.log("it is executing");
      const checkUser = await axios.get("/isuser");
      if (checkUser.data) {
        console.log("user has found");
        console.log(checkUser.data[0].name);
        navigate("/home", {
          state: {
            name: checkUser.data[0].name,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    check();
  }, []);

  let [forget, setForget] = useState(false);
  let [eyeOpen, setEyeOpen] = useState(true);
  let [hide, setHide] = useState("password");

  const toggleEye = () => {
    setEyeOpen(!eyeOpen);
  };

  const toggleVisibilty = () => {
    if (hide == "password") {
      setHide("text");
    } else {
      setHide("password");
    }

    toggleEye();
  };

  const getSignindetails = async (event) => {
    event.preventDefault();
    let formData = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
    };

    let data = await axios.post("/create", formData);
    console.log(data.data);
    if (data.data) {
      navigate("/validate", {
        state: {
          name: data.data.name,
          mail: data.data.mail,
          otp: data.data.otp,
          is_forget: data.data.is_forget,
          pass: data.data.pass,
        },
      });
    } else {
      window.alert("Account already exists, try to log in");
    }
  };

  const getLoginDetails = async (event) => {
    event.preventDefault();

    let formData = {
      email: event.target[0].value,
      password: event.target[1].value,
    };

    let res = await axios.post("/login", formData);
    if (res.data[0] == "auth") {
      console.log("correct password");
      navigate("/home", {
        state: {
          name: res.data[1],
        },
      });
    } else if ((res.data = "no-auth")) {
      console.log("wrong password");
      window.alert("wrong password");
    } else {
      window.alert("Account not found");
    }
  };

  const handleForget = async (event) => {
    event.preventDefault();
    let data = {
      mail: event.target[0].value,
    };

    let res = await axios.post("/forget", data);
    console.log(res.data);
    navigate("/validate", {
      state: {
        mail: res.data.mail,
        otp: res.data.otp,
        is_forget: res.data.is_forget,
      },
    });
  };

  return (
    <div className="land">
      <img src="https://i.ibb.co/RDMkY25/text-logo-color.png" alt="" />
      <br /> <br /> <br />
      <p className="tagline">
        Design. Create. Inspire. Welcome to Desx - Your Ultimate UI Playground!
        Unleash your creativity, bring your ideas to life, and craft stunning
        web interfaces effortlessly with our powerful tools and seamless
        experience.
      </p>
      <br />
      <div className="button-box">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Sign up</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={getSignindetails}
              className="needs-validation"
              novalidate
            >
              <DialogHeader>
                <DialogTitle>Welcome !</DialogTitle>
                <DialogDescription>
                  Enter relevant e-mail account and create a strong password
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right form-label">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue=""
                    className="col-span-3 form-control"
                    required
                  />
                  <div class="invalid-feedback">Please Enter a name.</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue=""
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Create Password
                  </Label>
                  <Input
                    type="text"
                    id="password"
                    defaultValue=""
                    className="col-span-3"
                    required
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
                    type={hide}
                    id="password"
                    defaultValue=""
                    className="col-span-3"
                    style={{
                      display: "inline",
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForget(true);
                  }}
                >
                  Forget password?
                </Button>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
            {eyeOpen ? (
              <div>
                <VisibilityOutlinedIcon onClick={toggleVisibilty} />
                <i>&nbsp;show password</i>
              </div>
            ) : (
              <div>
                <VisibilityOffOutlinedIcon onClick={toggleVisibilty} />
                <i>&nbsp;hide password</i>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* forget password */}
        <Dialog open={forget} onOpenChange={setForget}>
          <DialogTrigger></DialogTrigger>
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
                  <Input id="email" defaultValue="" className="col-span-3" required/>
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
