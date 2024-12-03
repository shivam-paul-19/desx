import axios from "axios";
import "./user.css";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

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

function UserPage() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("user@example.com");
  let [name, setName] = useState("user");
  let [pass, setPass] = useState("randompassword123@");
  let [eyeOpen, setEyeOpen] = useState(true);
  let [hide, setHide] = useState("password");
  let [passChange, setPassChange] = useState(false);
  let [nameChange, setNameChange] = useState(false);
  let [isLogout, setIsLogout] = useState(false);
  let [isDel, setIsDel] = useState(false);

  const getUserData = async () => {
    let userdata = await axios.get("/getuser");
    console.log(userdata.data);
    setEmail(userdata.data.email);
    setName(userdata.data.name);
    setPass(userdata.data.password);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const toggleVisibilty = () => {
    if (hide == "password") {
      setHide("text");
    } else {
      setHide("password");
    }

    setEyeOpen(!eyeOpen);
  };

  const changeName = async (event) => {
    event.preventDefault();
    let data = {
      mail: email,
      newName: event.target[0].value,
    };
    setNameChange(!nameChange);
    await axios.post("/updatename", data);
    getUserData();
  };

  const changePassword = async (event) => {
    event.preventDefault();
    let data = {
      mail: email,
      newPass: event.target[0].value,
    };
    setPassChange(!passChange);
    await axios.post("/updatepassword", data);
    getUserData();
  };

  return (
    <div style={{ width: "700px" }}>
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          display: "flex",
        }}
      >
        <ArrowBackIosRoundedIcon onClick={() => navigate("/home")} />
        &nbsp;&nbsp;
        <h1>Account settings</h1>
      </div>
      <h1 style={{ fontSize: "50px", fontWeight: "700" }}>{email}</h1>
      <br /> <br />
      <Label>Name</Label>
      <div className="input-box">
        <Input disabled type="text" value={name} style={{ width: "500px" }} />
        <Button onClick={() => setNameChange(!nameChange)}>Change</Button>
      </div>
      <br />
      <Label>Password</Label>
      <div className="input-box">
        <Input disabled type={hide} value={pass} style={{ width: "500px" }} />
        {eyeOpen ? (
          <VisibilityOffOutlinedIcon onClick={toggleVisibilty} />
        ) : (
          <VisibilityOutlinedIcon onClick={toggleVisibilty} />
        )}
        <Button onClick={() => setPassChange(!passChange)}>Change</Button>
      </div>
      <br /> <br />
      <Button
        variant="secondary"
        onClick={() => {
          setIsLogout(true);
        }}
      >
        Log Out
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button
        variant="destructive"
        onClick={() => {
          setIsDel(true);
        }}
      >
        Delete account
      </Button>
      {/* changing password */}
      <Dialog open={passChange} onOpenChange={setPassChange}>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={changePassword}
            className="needs-validation"
            novalidate
          >
            <DialogHeader>
              <DialogTitle>Change password</DialogTitle>
              <DialogDescription>
                Enter old password and new password
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  New Password
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
              <Button type="submit">Change</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* for changing name */}
      <Dialog open={nameChange} onOpenChange={setNameChange}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={changeName} className="needs-validation" novalidate>
            <DialogHeader>
              <DialogTitle>Change Name</DialogTitle>
              <DialogDescription>Enter new Name</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  New name
                </Label>
                <Input
                  type="text"
                  id="name"
                  defaultValue=""
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Change</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* logout warning */}
      <AlertDialog open={isLogout} onOpenChange={setIsLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Once logged out, you have to login again with yout credentials
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsLogout(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                setIsLogout(false);
                await axios.get("/logout");
                navigate("/");
              }}
            >
              Log out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* Delete warning */}
      <AlertDialog open={isDel} onOpenChange={setIsDel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action can't be undone, all your information will be deleted
              permanently
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDel(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                setIsDel(false);
                await axios.get("/deleteuser");
                navigate("/");
              }}
            >
              Delete Account
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default UserPage;
