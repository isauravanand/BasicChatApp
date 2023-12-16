const mongoose = require("mongoose");
const Chat = require("./models/chat");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/watsapp');
}
main()
    .then((res) => {
        console.log(res);
    })
    .catch(err =>
        console.log(err)
    );


let allChat = [
    {
        from: "Saurav",
        to: "anand",
        msg: "I Want to do MERN Stack develpment",
        reached_at: new Date()
    },
    {
        from: "anand",
        to: "subham",
        msg: "Hi how are you",
        reached_at: new Date()
    },
    {
        from: "ankit",
        to: "shivam",
        msg: "i am fine ND you",
        reached_at: new Date()
    },
    {
        from: "sanjeet",
        to: "santosh",
        msg: "i have my assignment pending",
        reached_at: new Date()
    },
    {
        from: "dev",
        to: "joseph",
        msg: "i thought you sings well",
        reached_at: new Date()
    },
    {
        from: "Adam",
        to: "eve",
        msg: "i am still alive man",
        reached_at: new Date()
    },
    {
        from: "Maahi",
        to: "Virat",
        msg: "i know you man",
        reached_at: new Date()
    },
];

Chat.insertMany(allChat)
.then(res=>{
console.log(res);
console.log("Document inserted");
}).catch(err => {
    console.log(err)
})


