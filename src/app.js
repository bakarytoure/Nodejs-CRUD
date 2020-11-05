const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db/db");
const jsonParser = bodyParser.json();
app = express();

app.get("/books", (req, res, next) => {
  pool.query(`SELECT * FROM books ORDER BY bookauthor DESC`, (q_err, q_res) => {
    res.json(q_res.rows);
  });
});
app.post("/books", jsonParser, (req, res, next) => {
  const values = [req.body.bookname, req.body.bookauthor];

  const text = "INSERT INTO books(bookname,bookauthor) VALUES($1,$2)";
  pool.query(text, values, (q_err, q_res) => {
    if (q_err) return next(q_err);
    res.json(q_res.rows);
  });
});

app.put("/books/:uid", jsonParser, (request, response, next) => {
  values = [
    request.body.bookname,
    request.body.bookauthor,
    parseInt(request.params.uid),
  ];
  console.log(request.body.bookname);
  console.log(request.body.bookauthor);
  const text = "UPDATE books SET bookname = $1, bookauthor = $2 WHERE uid = $3";
  pool.query(text, values, (error, results) => {
    if (error) return next(error);
    response.json(results.rows);
  });
});
app.delete("/books/:uid", jsonParser, (req, res, next) => {
  values = [parseInt(req.params.uid)];
  text = "DELETE FROM books WHERE uid = $1";
  pool.query(text, values, (error, results) => {
    if (error) return next(error);
    res.json(results.rows);
  });
});
app.listen(3000);
