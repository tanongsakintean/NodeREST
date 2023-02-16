require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 1",
    author: "author 1",
  },
  {
    id: 2,
    title: "Book 2",
    author: "author 2",
  },
  {
    id: 3,
    title: "Book 3",
    author: "author 3",
  },
];

app.get("/books", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(400).send("book not found");
  } else {
    res.json(book);
  }
});

app.post("/books/:title/:author", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.params.title,
    author: req.params.author,
  };

  books.push(book);
  // console.log(req.params);
  res.send(book);
});

app.put("/books/:id", (req, res) => {
  console.log(req.params.id);
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(400).send("book not found");
  }

  book.title = req.body.title;
  book.author = req.body.author;

  res.send(book);
});

app.delete("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    res.status(400).send("book not found");
  }

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listen port ${port}`);
});
