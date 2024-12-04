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

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LandingPage() {
  const navigate = useNavigate();

  // const axiosInstance = axios.create({
  //   baseURL: BASE_URL, 
  // });

  const check = async () => {
    try {
      const checkUser = await axios.get(`${BASE_URL}/isuser`);
      if (checkUser.data) {
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
  let [notFound, setNotFound] = useState(false);
  let [validMail, setValidMail] = useState(false);
  let [isExist, setIsExist] = useState(false);
  let [wrongPassword, setWrongPass] = useState(false);

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

  const validateEmail = (mail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailRegex.test(mail)) {
      return true;
    } else {
      return false;
    }
  }

  const getSignindetails = async (event) => {
    event.preventDefault();
    let formData = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
    };

    if(!validateEmail(formData.email)) {
      setValidMail(true);
    } else {
      let data = await axios.post("/create", formData);
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
        setIsExist(true);
      }
    }
  };

  const getLoginDetails = async (event) => {
    event.preventDefault();

    let formData = {
      email: event.target[0].value,
      password: event.target[1].value,
    };

    let res = await axios.post(`${BASE_URL}/login`, formData);
    if (res.data == "auth") {
      navigate("/home");
    } else if (res.data == "no-auth") {
      setWrongPass(true);
    } else if (res.data == "no") {
      setNotFound(true);
    }
  };

  const handleForget = async (event) => {
    event.preventDefault();
    let data = {
      mail: event.target[0].value,
    };

    if(!validateEmail(data.mail)) {
      setValidMail(true);
    } else {
      let res = await axios.post("/forget", data);
      navigate("/validate", {
        state: {
          mail: res.data.mail,
          otp: res.data.otp,
          is_forget: res.data.is_forget,
        },
      });
    }

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
                  Forgot password?
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
                  <Input
                    id="email"
                    defaultValue=""
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* account not found */}
        <AlertDialog open={notFound} onOpenChange={setNotFound}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Account not found</AlertDialogTitle>
            <AlertDialogDescription>
              There is not user with this email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setNotFound(false)}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        {/* invalid email */}
        <AlertDialog open={validMail} onOpenChange={setValidMail}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid email</AlertDialogTitle>
            <AlertDialogDescription>
              kindly enter a valid email
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setValidMail(false)}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        {/* user exists */}
        <AlertDialog open={isExist} onOpenChange={setIsExist}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>User already exists</AlertDialogTitle>
            <AlertDialogDescription>
              An account already exists with this mail you have entered, try to login with your credentials.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setIsExist(false)}>
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        {/* user exists */}
        <AlertDialog open={wrongPassword} onOpenChange={setWrongPass}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Wrong Password</AlertDialogTitle>
            <AlertDialogDescription>
              The password you have entered is wrong, you reset is by clicking on 'Forgot password'
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setWrongPass(false)}>
              OK
            </Button>
            <Button onClick={() => {setForget(true);}}>
              Forgot Password?
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}

export default LandingPage;