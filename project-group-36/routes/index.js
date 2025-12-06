var express = require('express');
var router = express.Router();

// temp storage for books - would be database in production
let books = [
  { id: 1, title: "Book One", author: "Author A", borrower: null, due: null },
  { id: 2, title: "Book Two", author: "Author B", borrower: "test@email.com", due: "2025-12-01" }
];

// check if user is logged in, redirect to login if not
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// show all books in catalog
router.get('/', function(req, res, next) {
  res.render('page1', { 
    title: 'Library Catalog', 
    books: books 
  });
});

// show form to add new book - only for logged in users
router.get('/add', isAuthenticated, function(req, res) {
  res.render('page2', { 
    title: 'Add New Book' 
  });
});

// success page after adding book
router.get('/bookadded', function(req, res) {
  res.render('bookadded', { 
    title: 'Book Added!' 
  });
});

// add book to collection - only for logged in users
router.post('/add', isAuthenticated, function(req, res) {
  const { title, author } = req.body;
  books.push({ id: books.length + 1, title, author, borrower: null, due: null });
  res.redirect('/bookadded');
});

// show form to lend book - only for logged in users
router.get('/lend/:id', isAuthenticated, function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  res.render('page3', { 
    title: 'Lend Book', 
    book: book 
  });
});

// save lending info for book - only for logged in users
router.post('/lend/:id', isAuthenticated, function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  book.borrower = req.body.borrower;
  book.due = req.body.due;
  res.redirect('/');
});

// mark book as returned - only for logged in users
router.post('/return/:id', isAuthenticated, function(req, res) {
  const book = books.find(b => b.id == req.params.id);
  book.borrower = null;
  book.due = null;
  res.redirect('/');
});

// show page to remove books - only for logged in users
router.get('/remove', isAuthenticated, function(req, res) {
  res.render('page4', { 
    title: 'Remove Book', 
    books: books 
  });
});

// delete book from collection - only for logged in users
router.post('/delete/:id', isAuthenticated, function(req, res) {
  const bookId = Number(req.params.id);
  books = books.filter(book => book.id !== bookId);
  res.redirect('/remove');
});

module.exports = router;
