const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true,
    select: false
  },
  location: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    unique: true,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['customer', 'deliveryman'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true,
    select: false
  },
  identity: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    unique: true,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

exports.userModel = mongoose.model('user', userSchema);
exports.adminModel = mongoose.model('admin', adminSchema);
