import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var title = "";
var blog = "";
var author = "";
var date = "";
var blog = [];
var blogs = [];

function getData(req, res, next) {
  title = req.body["title"];
  blog = req.body["blog"];
  author = req.body["author"];
  date = req.body["date"];
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(getData);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { blog });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/submit", (req, res) => {
  blog = [
    {
      title: title,
      blog: blog,
      author: author,
      date: date,
    },
  ];
  blogs.push(blog);

  res.render("index.ejs", { blog });
  res.render("library.ejs", { blogs });
});

app.get("/delete", (req, res) => {
  const index = parseInt(req.query.index);
  blogs.splice(index, 1);
  res.render("library.ejs", { blogs });
});

app.get("/edit", (req, res) => {
    const index = parseInt(req.query.index);
    res.render("edit.ejs", { blog: blogs[index], index: index });

});

app.post("/edited", (req, res) => {
  const index = parseInt(req.body.index);
  blogs[index] = [
    {
      title: req.body.title,
      blog: req.body.blog,
      author: req.body.author,
      date: req.body.date,
    }
  ];
  res.redirect("/library");
});

app.get("/library", (req, res) => {
  res.render("library.ejs", { blogs });
});

app.listen(port, () => {
  console.log(`Serever is running on port ${port}`);
});
