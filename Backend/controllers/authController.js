import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Token from '../models/Token.js';
import { sendEmail } from '../utils/email.js';
import { generateTokens, verifyToken } from '../utils/tokens.js';
import { authValidation } from '../validations/authValidation.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

export const register = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = authValidation.register.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message
      });
    }
    
    const { name, email, password, passwordConfirm, phone } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 'fail',
        message: 'User already exists with this email'
      });
    }
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      phone,
      profile: {
        location: 'Dire Dawa, Ethiopia'
      }
    });
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await Token.create({
      token: verificationToken,
      userId: newUser._id,
      type: 'email-verification',
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Send verification email
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${verificationToken}`;
    
    try {
      await sendEmail({
        email: newUser.email,
        subject: 'Verify your email address',
        template: 'email-verification',
        data: {
          name: newUser.name,
          verificationUrl
        }
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue without failing the registration
    }
    
    createSendToken(newUser, 201, req, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = authValidation.login.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message
      });
    }
    
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }
    
    // Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password +loginAttempts +lockUntil');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      await user.incrementLoginAttempts();
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }
    
    // Check if account is locked
    if (user.isLocked()) {
      return res.status(423).json({
        status: 'fail',
        message: 'Account temporarily locked due to too many failed login attempts'
      });
    }
    
    // Reset login attempts on successful login
    await User.findByIdAndUpdate(user._id, {
      loginAttempts: 0,
      lockUntil: undefined,
      lastLogin: new Date()
    });
    
    createSendToken(user, 200, req, res);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { error } = authValidation.forgotPassword.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message
      });
    }
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'There is no user with that email address'
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    await Token.create({
      token: resetToken,
      userId: user._id,
      type: 'password-reset',
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });
    
    // Send email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
    
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 minutes)',
        template: 'password-reset',
        data: {
          name: user.name,
          resetURL
        }
      });
      
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      await Token.deleteOne({ token: resetToken });
      
      return res.status(500).json({
        status: 'fail',
        message: 'There was an error sending the email. Try again later!'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { error } = authValidation.resetPassword.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'fail',
        message: error.details[0].message
      });
    }
    
    // Get user based on token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    const token = await Token.findOne({
      token: hashedToken,
      type: 'password-reset',
      expiresAt: { $gt: Date.now() }
    });
    
    if (!token) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token is invalid or has expired'
      });
    }
    
    const user = await User.findById(token.userId);
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User no longer exists'
      });
    }
    
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    
    // Delete all reset tokens for this user
    await Token.deleteMany({ userId: user._id, type: 'password-reset' });
    
    createSendToken(user, 200, req, res);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    const token = await Token.findOne({
      token: hashedToken,
      type: 'email-verification',
      expiresAt: { $gt: Date.now() }
    });
    
    if (!token) {
      return res.status(400).json({
        status: 'fail',
        message: 'Token is invalid or has expired'
      });
    }
    
    const user = await User.findById(token.userId);
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User no longer exists'
      });
    }
    
    user.isVerified = true;
    await user.save();
    
    // Delete verification token
    await Token.deleteOne({ _id: token._id });
    
    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully'
    });
  } catch (error) {
    next(error);
  }
};