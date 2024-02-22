const express = require("express");
let morgan = require("morgan");

const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

//db url
let mongoUrl =
  "mongodb+srv://thurain990:duatpisi@cluster0.bbrofit.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connected to DB");

    app.listen(3000, () => {
      console.log("app is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/add-blog", async (req, res) => {
  let blog = new Blog({
    title: "blog title 4",
    intro: "blog intro 4",
    body: "blog body 4",
  });

  await blog.save();
  res.send("blog saved");
});

app.get("/single-blog", async (req, res) => {
  let blog = await Blog.findById("65d0cf76fbe882e88d044a33");

  res.json(blog);
});

app.get("/", async (req, res) => {
  let blogs = await Blog.find().sort({ createdAt: -1 });
  console.log(blogs);

  res.render("home", {
    blogs,
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});
