const Book = require('../models/Book');
var express = require('express');
var router = express.Router();

// In-memory book data (temporary for development)
let books = [
  { id: 1, title: "Book One", author: "Author A", borrower: null, due: null },
  { id: 2, title: "Book Two", author: "Author B", borrower: "test@email.com", due: "2025-12-01" }
];

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// Home page: Catalog list
router.get('/', async function(req, res, next) {
  const books = await Book.find();
  res.render('page1', { 
    title: 'Library Catalog', 
    books: books 
  });
});

// Add Book form - Protected
router.get('/add', isAuthenticated, function(req, res) {
  res.render('page2', { 
    title: 'Add New Book' 
  });
});


// Book Added
router.get('/bookadded', function(req, res) {
  res.render('bookadded', { 
    title: 'Book Added!' 
  });
});

// Add Book (handle POST) - Protected
router.post('/add', isAuthenticated, function(req, res) {
  const { title, author } = req.body;
  books.push({ id: books.length + 1, title, author, borrower: null, due: null });
  res.redirect('/bookadded');
});

// Lend Book form - Protected
router.get('/lend/:id', isAuthenticated, function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  res.render('page3', { 
    title: 'Lend Book', 
    book: book 
  });
});

// Lend Book (handle POST) - Protected
router.post('/lend/:id', isAuthenticated, function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  book.borrower = req.body.borrower;
  book.due = req.body.due;
  res.redirect('/');
});


// Return Book - Protected
router.post('/return/:id', isAuthenticated, function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  book.borrower = null;
  book.due = null;
  res.redirect('/');
});


// Remove Book - Protected
router.get('/remove', isAuthenticated, function(req, res) {
  res.render('page4', { 
    title: 'Remove Book', 
    books: books 
  });
});

router.post('/delete/:id', isAuthenticated, function(req, res) {
  const bookId = Number(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.redirect('/remove');
});


module.exports = router;
