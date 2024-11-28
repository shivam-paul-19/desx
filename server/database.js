import mongoose from 'mongoose';
import { User } from './models/users.js';
import { Canvas } from './models/canvas.js';

// main()
// .then((res) => {
//     console.log("connection succesful");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/desx');
// }

export const insertUser = (mail, name, pass) => {
    let user1 = new User({
        email: mail,
        name: name,
        password: pass
    });
    
    user1.save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const insertCanvas = (canvas) => {
    let canvas1 = new Canvas(canvas)

    canvas1.save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const updatePassword = async (mail, pass) => {
    let newpass = await User.updateOne({
        email: mail
    }, {
        password: pass
    })
}