// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'data/comments.json');

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static files
app.use(express.static('public'));

// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }
    const comments = JSON.parse(data);
    res.json(comments);
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.status(500).send('Internal server error');
      return;
    }
    const comments = JSON.parse(data);
    const newComment = {
            id: Date.now(),
            text: req.body.text,
            author: req.body.author
          };
          comments.push(newComment);
          fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
            if (err) {
              res.status(500).send('Internal server error');
              return;
            }
            res.status(201).json(newComment);
          });
        });
      });