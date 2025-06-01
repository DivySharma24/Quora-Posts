const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

let posts = [
    {id: uuidv4(), username: "itsMilo", content: "Just out here doing my best. That's all. #SimpleThings"},
    {id: uuidv4(), username: "zenvibe_", content: "Breathe in. Let go. Life's lighter that way."},
    {id: uuidv4(), username: "loopdaily", content: "Today's loop: wake, think, laugh, repeat."},
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs", {posts});
});

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("app is listening on port 3000");
});