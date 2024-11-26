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

let sampleUsers = [
    {
        email: "john.doe@gmail.com",
        name: "John Doe",
        password: "password123"
    },
    {
        email: "jane.smith@yahoo.com",
        name: "Jane Smith",
        password: "securePass456"
    },
    {
        email: "alex.brown@outlook.com",
        name: "Alex Brown",
        password: "welcome789"
    },
    {
        email: "emily.jones@gmail.com",
        name: "Emily Jones",
        password: "myPassword101"
    },
    {
        email: "michael.lee@hotmail.com",
        name: "Michael Lee",
        password: "abc123xyz"
    },
    {
        email: "sophia.taylor@protonmail.com",
        name: "Sophia Taylor",
        password: "passMe202"
    },
    {
        email: "william.clark@gmail.com",
        name: "William Clark",
        password: "bestPassword"
    },
    {
        email: "ava.wilson@yahoo.com",
        name: "Ava Wilson",
        password: "helloWorld1"
    },
    {
        email: "oliver.moore@outlook.com",
        name: "Oliver Moore",
        password: "secret987"
    },
    {
        email: "mia.davis@gmail.com",
        name: "Mia Davis",
        password: "randomPass321"
    }
];

User.insertMany(sampleUsers)
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log(err);
})