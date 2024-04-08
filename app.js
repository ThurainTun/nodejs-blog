const express = require("express");
let morgan = require("morgan");

const app = express();
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');
const Blog = require("./models/Blog");
const blogRoutes=require("./routes/blogRoute");

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
app.use(expressLayouts);
app.set('layout', 'layouts/default');


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

app.get('/',async(req,res)=>{
  res.redirect('/blogs');
})


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

app.use('/blogs',blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
  });
});
