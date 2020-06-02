const express = require("express");

const playstore = require("./playstore.js");

const app = express();

app.get("/apps", (req, res) => {
  const { app = "", sort, genere } = req.query;

  if (sort) {
    if (!["App", "rating"].includes(sort)) {
      return res.status(400).send("Sort must be one of App or rating");
    }
  }

  let results = playstore.filter((apps) =>
    apps.App.toLowerCase().includes(app.toLowerCase())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[rating] > b[rating] ? 1 : a[rating] < b[rating] ? -1 : 0;
    });
  }

  res.json(results);
});

app.listen(8000, () => {
  console.log("Server started on PORT 8000");
});
