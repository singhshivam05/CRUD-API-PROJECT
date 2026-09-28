const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "shivam",
        content: "i am shivam",
    },
    {
        id: uuidv4(),
        username: "shraddha",
        content: "i am shraddha",
    },
    {
        id: uuidv4(),
        username: "rishika",
        content: "i am rishika",
    }
];


// =========================
// ALL POSTS
// =========================

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});


// =========================
// NEW POST PAGE
// =========================

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});


// =========================
// CREATE NEW POST
// =========================

app.post("/posts", (req, res) => {

    let { username, content } = req.body;

    let newPost = {
        id: uuidv4(),
        username,
        content
    };

    posts.push(newPost);

    res.redirect("/posts");
});


// =========================
// EDIT PAGE
// =========================

app.get("/posts/:id/edit", (req, res) => {

    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit.ejs", { post });
});


// =========================
// SHOW PARTICULAR POST
// =========================

app.get("/posts/:id", (req, res) => {

    let { id } = req.params;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs", { post });
});


// =========================
// UPDATE POST
// =========================

app.patch("/posts/:id", (req, res) => {

    let { id } = req.params;

    let newContent = req.body.content;

    let post = posts.find((p) => id === p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = newContent;

    res.redirect(`/posts/${id}`);
});


// =========================
// DELETE POST
// =========================

app.delete("/posts/:id", (req, res) => {

    let { id } = req.params;

    posts = posts.filter((p) => p.id !== id);

    res.redirect("/posts");
});


// =========================
// SERVER
// =========================

app.listen(port, () => {
    console.log(`listening to port : ${port}`);
});