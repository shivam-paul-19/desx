import mongoose from 'mongoose';
import { User } from './models/users.js';

main()
.then((res) => {
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/desx');
}

let user1 = new User({
    email: "sample@gmail.com",
    name: "sample_name",
    password: "*password*"
});

user1.save()
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})