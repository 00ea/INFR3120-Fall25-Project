var express = require('express');
var router = express.Router();

// In-memory user storage (temporary for development)
// In production, use a database and hash passwords
let users = [
  { id: 1, email: 'test@email.com', password: 'password123' }
];

// Login page
router.get('/login', function(req, res) {
  res.render('login', { 
    title: 'Login',
    error: null
  });
});

// Handle login
router.post('/login', function(req, res) {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Set session
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    res.redirect('/');
  } else {
    res.render('login', {
      title: 'Login',
      error: 'Invalid email or password'
    });
  }
});

// Register page
router.get('/register', function(req, res) {
  res.render('register', {
    title: 'Register',
    error: null
  });
});

// Handle registration
router.post('/register', function(req, res) {
  const { email, password, confirmPassword } = req.body;
  
  // Validation
  if (!email || !password || !confirmPassword) {
    return res.render('register', {
      title: 'Register',
      error: 'All fields are required'
    });
  }
  
  if (password !== confirmPassword) {
    return res.render('register', {
      title: 'Register',
      error: 'Passwords do not match'
    });
  }
  
  // Check if user exists
  if (users.find(u => u.email === email)) {
    return res.render('register', {
      title: 'Register',
      error: 'Email already registered'
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password // In production, hash this!
  };
  
  users.push(newUser);
  
  // Auto-login after registration
  req.session.userId = newUser.id;
  req.session.userEmail = newUser.email;
  
  res.redirect('/');
});

// Logout
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

module.exports = router;
