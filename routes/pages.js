const path = require('path');
const express = require('express');

const router = express.Router();

function sendPage(req, res, fileName) {
  res.sendFile(path.join(req.app.locals.publicDir, fileName));
}

// GET /
router.get('/', (req, res) => {
  // Serve public/index.html.
  sendPage(req, res, 'index.html');

});

// GET /about
router.get('/about', (req, res) => {
  // Serve public/about.html.
  sendPage(req, res, 'about.html');

});

// GET /contact
router.get('/contact', (req, res) => {
  // Serve public/contact.html.
  sendPage(req, res, 'contact.html');

});

//GET /blog
router.get('/blog', (req, res) => {
  // Keep this route working after moving page routes into this router.
  sendPage(req, res, 'blog.html');

});

module.exports = router;