var express = require('express');
var router = express.Router();
const User = require('../models/User');

// show login page
router.get('/login', function(req, res) {
  res.render('login', { 
    title: 'Login',
    error: null
  });
});

// handle login form submission
router.post('/login', async function(req, res) {
  try {
    const { email, password } = req.body;
    
    // validate inputs
    if (!email || !password) {
      return res.render('login', {
        title: 'Login',
        error: 'Email and password are required'
      });
    }
    
    // find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.render('login', {
        title: 'Login',
        error: 'Invalid email or password'
      });
    }
    
    // compare passwords
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.render('login', {
        title: 'Login',
        error: 'Invalid email or password'
      });
    }
    
    // save user to session
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('login', {
      title: 'Login',
      error: 'An error occurred. Please try again.'
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
router.post('/register', async function(req, res) {
  try {
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
    
    // check password length
    if (password.length < 6) {
      return res.render('register', {
        title: 'Register',
        error: 'Password must be at least 6 characters'
      });
    }
    
    // check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('register', {
        title: 'Register',
        error: 'Email already registered'
      });
    }
    
    // create new user (password will be hashed by schema.pre)
    const newUser = new User({
      email,
      password
    });
    
    await newUser.save();
    
    // auto login after registration
    req.session.userId = newUser._id;
    req.session.userEmail = newUser.email;
    
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('register', {
      title: 'Register',
      error: 'An error occurred. Please try again.'
    });
  }
});

// logout and destroy session
router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      return res.redirect('/');
    }
    res.redirect('/auth/login');
  });
});

// show change password page
router.get('/change-password', isAuthenticated, async function(req, res) {
  res.render('change-password', { 
    title: 'Change Password',
    error: null,
    success: null
  });
});

// handle password change
router.post('/change-password', isAuthenticated, async function(req, res) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.render('change-password', { 
        title: 'Change Password',
        error: 'All fields required',
        success: null
      });
    }

    if (newPassword !== confirmPassword) {
      return res.render('change-password', { 
        title: 'Change Password',
        error: 'New passwords do not match',
        success: null
      });
    }

    const user = await User.findById(req.session.userId);
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.render('change-password', { 
        title: 'Change Password',
        error: 'Current password is incorrect',
        success: null
      });
    }

    user.password = newPassword;
    await user.save();

    res.render('change-password', { 
      title: 'Change Password',
      error: null,
      success: 'Password changed successfully!'
    });
  } catch (err) {
    console.error(err);
    res.render('change-password', { 
      title: 'Change Password',
      error: 'An error occurred',
      success: null
    });
  }
});

// Helper function (add if not already there)
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}


module.exports = router;
