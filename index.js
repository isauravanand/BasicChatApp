//Basis SetUp
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


//Mongo Db
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/watsapp');
}
main()
    .then(() => {
        console.log("Connection successfull");
    })
    .catch(err =>
        console.log(err)
    );


//Express Js
app.listen(8080, () => {
    console.log("app is listening to the port 8080");
});

app.get("/", (req, res) => {
    res.send("Home route")
});

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
})

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        reached_at: new Date()
    })
    newChat.save()
    .then((res)=>{
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg :newMsg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id , {msg:newMsg},{ runValidators:true , new:true});
    console.log(updateChat);
    res.redirect("/chats");
})

app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deleted = await Chat.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/chats");
})