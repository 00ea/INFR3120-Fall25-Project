var express = require('express');
var router = express.Router();

// temp user storage - would be database in production
// note: passwords should be hashed in production!
let users = [
  { id: 1, email: 'test@email.com', password: 'password123' }
];

// show login page
router.get('/login', function(req, res) {
  res.render('login', { 
    title: 'Login',
    error: null
  });
});

// handle login form submission
router.post('/login', function(req, res) {
  const { email, password } = req.body;
  
  // find user with matching email and password
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // save user to session
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    res.redirect('/');
  } else {
    // show error if login fails
    res.render('login', {
      title: 'Login',
      error: 'Invalid email or password'
    });
  }
});

// show registration page
router.get('/register', function(req, res) {
  res.render('register', {
    title: 'Register',
    error: null
  });
});

// handle registration form submission
router.post('/register', function(req, res) {
  const { email, password, confirmPassword } = req.body;
  
  // check all fields are filled
  if (!email || !password || !confirmPassword) {
    return res.render('register', {
      title: 'Register',
      error: 'All fields are required'
    });
  }
  
  // check passwords match
  if (password !== confirmPassword) {
    return res.render('register', {
      title: 'Register',
      error: 'Passwords do not match'
    });
  }
  
  // check email is not already registered
  if (users.find(u => u.email === email)) {
    return res.render('register', {
      title: 'Register',
      error: 'Email already registered'
    });
  }
  
  // create new user
  const newUser = {
    id: users.length + 1,
    email,
    password // should be hashed in production!
  };
  
  users.push(newUser);
  
  // auto login after registration
  req.session.userId = newUser.id;
  req.session.userEmail = newUser.email;
  
  res.redirect('/');
});

// logout and destroy session
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

module.exports = router;