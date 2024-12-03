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
        return true;
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
}

export const updatePassword = async (mail, pass) => {
    let newpass = await User.updateOne({
        email: mail
    }, {
        password: pass
    })
};

export const updateName = async (mail, name) => {
    let newpass = await User.updateOne({
        email: mail
    }, {
        name: name
    })
};

export const updateCanvas = async (user, name, state, time) => {
    let newCanvas = await Canvas.updateOne({
        user: user,
        name: name
    }, {
        canvas_state: state,
        last_updated: time
    })
};

export const getCanvas = async (user) => {
    let c = await Canvas.find({
        user: user
    });

    return c;
}

export const loadCanvas = async (user, name) => {
    let c = await Canvas.findOne({
        name: name,
        user: user
    });

    return c;
}

export const deleteCanvas = async(user, name) => {
    await Canvas.deleteOne({
        user: user,
        name: name
    });
}

export const deleteAll = async(user) => {
    await Canvas.deleteMany({
        user: user
    });

    await User.deleteOne({
        email: user
    });
}