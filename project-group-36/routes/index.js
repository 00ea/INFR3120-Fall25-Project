const Book = require('../models/Book');
var express = require('express');
var router = express.Router();

// Home page: Catalog list
router.get('/', async function(req, res, next) {
  const books = await Book.find();
  res.render('page1', { 
    title: 'Library Catalog', 
    books: books 
  });
});

// Add Book form
router.get('/add', function(req, res) {
  res.render('page2', { title: 'Add New Book' });
});

router.post('/add', async function(req, res) {
  await Book.create(req.body);
  res.redirect('/bookadded');
});


// Book Added
router.get('/bookadded', function(req, res) {
  res.render('bookadded', { 
    title: 'Book Added!' 
  });
});

// Lend Book form
router.get('/lend/:id', async function(req, res) {
  const book = await Book.findById(req.params.id);
  res.render('page3', { title: 'Lend Book', book: book });
});

router.post('/lend/:id', async function(req, res) {
  await Book.findByIdAndUpdate(req.params.id, { 
    borrower: req.body.borrower, 
    due: req.body.due 
  });
  res.redirect('/');
});


// Return Book
router.post('/return/:id', async function(req, res) {
  await Book.findByIdAndUpdate(req.params.id, { 
    borrower: null, 
    due: null 
  });
  res.redirect('/');
});


// Remove Book
router.get('/remove', async function(req, res) {
  const books = await Book.find();
  res.render('page4', { title: 'Remove Book', books: books });
});

router.post('/delete/:id', async function(req, res) {
  await Book.findByIdAndDelete(req.params.id);
  res.redirect('/remove');
});


module.exports = router;
