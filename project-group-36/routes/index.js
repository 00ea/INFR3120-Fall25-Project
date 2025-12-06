const Book = require('../models/Book');
var express = require('express');
var router = express.Router();

// check if user is logged in, redirect to login if not
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// show all books in catalog (only user's books)
router.get('/', async function(req, res, next) {
  try {
    let books = [];
    
    // if user is logged in, show only their books
    if (req.session && req.session.userId) {
      books = await Book.find({ userId: req.session.userId });
    }
    
    res.render('page1', { 
      title: 'Library Catalog', 
      books: books 
    });
  } catch (err) {
    next(err);
  }
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
router.post('/add', isAuthenticated, async function(req, res) {
  try {
    const { title, author } = req.body;
    const newBook = new Book({
      title,
      author,
      userId: req.session.userId,
      borrower: null,
      due: null
    });
    await newBook.save();
    res.redirect('/bookadded');
  } catch (err) {
    next(err);
  }
});

// show form to lend book - only for logged in users
router.get('/lend/:id', isAuthenticated, async function(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    
    // verify this book belongs to the logged-in user
    if (!book || book.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).render('error', { 
        title: 'Access Denied', 
        message: 'You do not have permission to lend this book' 
      });
    }
    
    res.render('page3', { 
      title: 'Lend Book', 
      book: book 
    });
  } catch (err) {
    next(err);
  }
});

// save lending info for book - only for logged in users
router.post('/lend/:id', isAuthenticated, async function(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    
    // verify this book belongs to the logged-in user
    if (!book || book.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).render('error', { 
        title: 'Access Denied', 
        message: 'You do not have permission to lend this book' 
      });
    }
    
    book.borrower = req.body.borrower;
    book.due = req.body.due;
    await book.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// mark book as returned - only for logged in users
router.post('/return/:id', isAuthenticated, async function(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    
    // verify this book belongs to the logged-in user
    if (!book || book.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).render('error', { 
        title: 'Access Denied', 
        message: 'You do not have permission to return this book' 
      });
    }
    
    book.borrower = null;
    book.due = null;
    await book.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// show page to remove books - only for logged in users
router.get('/remove', isAuthenticated, async function(req, res) {
  try {
    const books = await Book.find({ userId: req.session.userId });
    res.render('page4', { 
      title: 'Remove Book', 
      books: books 
    });
  } catch (err) {
    next(err);
  }
});

// delete book from collection - only for logged in users
router.post('/delete/:id', isAuthenticated, async function(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    
    // verify this book belongs to the logged-in user
    if (!book || book.userId.toString() !== req.session.userId.toString()) {
      return res.status(403).render('error', { 
        title: 'Access Denied', 
        message: 'You do not have permission to delete this book' 
      });
    }
    
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/remove');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
