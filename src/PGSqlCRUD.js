const express = require("express");
const Sequelize = require("sequelize");
require("dotenv").config();

const app = express();

const dbUrl =
  "postgres://webadmin:HQVnqx91624@node42522-tanongsak.proen.app.ruk-com.cloud:11545/Books";
app.use(express.json());

const sequelize = new Sequelize(dbUrl);

const Book = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize.sync();

app.get("/books", (req, res) => {
  Book.findAll()
    .then((books) => {
      console.log(books[books.length - 1].id);
      res.json(books);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/books/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send("book not found");
      } else {
        res.json(book);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/books", (req, res) => {
  let maxId = 1;
  Book.findAll().then((books) => {
    maxId = books[books.length - 1].id;
    maxId++;
    let data = req.body;
    Object.assign(data, { id: maxId });
    Book.create(data)
      .then((book) => {
        res.send(book);
      })
      .catch((err) => res.status(500).send(err));
  });
});

app.put("/books/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send("book not found");
      } else {
        book.update(req.body).then((book) => {
          res.send(book);
        });
      }
    })
    .catch((err) => res.status(500).send(err));
});

app.delete("/books/:id", (req, res) => {
  Book.findByPk(req.params.id)
    .then((book) => {
      if (!book) {
        res.status(404).send("book not found");
      } else {
        book
          .destroy()
          .then(() => res.send({}))
          .catch((err) => res.status(500).send(err));
      }
    })
    .catch((err) => res.status(500).send(err));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
