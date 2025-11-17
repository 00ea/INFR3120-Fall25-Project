var express = require('express');
var router = express.Router();

// In-memory book data (temporary for development)
let books = [
  { id: 1, title: "Book One", author: "Author A", borrower: null, due: null },
  { id: 2, title: "Book Two", author: "Author B", borrower: "test@email.com", due: "2025-12-01" }
];

// Home page: Catalog list
router.get('/', function(req, res, next) {
  res.render('page1', { 
    title: 'Library Catalog', 
    books: books 
  });
});

// Add Book form
router.get('/add', function(req, res) {
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

// Add Book (handle POST)
router.post('/add', function(req, res) {
  const { title, author } = req.body;
  books.push({ id: books.length + 1, title, author, borrower: null, due: null });
  res.redirect('/bookadded');
});

// Lend Book form
router.get('/lend/:id', function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  res.render('page3', { 
    title: 'Lend Book', 
    book: book 
  });
});

// Lend Book (handle POST)
router.post('/lend/:id', function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  book.borrower = req.body.borrower;
  book.due = req.body.due;
  res.redirect('/');
});

// Return Book
router.post('/return/:id', function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  book.borrower = null;
  book.due = null;
  res.redirect('/');
});

// Remove Book
router.get('/remove', function(req, res) {
  res.render('page4', { 
    title: 'Remove Book', 
    books: books 
  });
});

router.post('/delete/:id', function(req, res) {
  const bookId = Number(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.redirect('/remove');
});

module.exports = router;
