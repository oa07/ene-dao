const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
  prodName: {
    type: String,
    required: true
  },
  prodDesc: {
    type: String,
    required: true
  },
  prodImage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  MRP: {
    type: Number,
    required: true
  },
  prodCategory: {
    type: String,
    required: true
  },
  rating: [
    {
      userID: String,
      rating: String
    }
  ],
  feedback: [
    {
      userID: String,
      feedback: String
    }
  ],
  popularity: {
    type: String,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const orderSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  orders: [
    {
      prodID: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      shopID: {
        type: String,
        required: true
      }
    }
  ],
  order_status: {
    type: String,
    required: true,
    enum: ['ORDER_PLACED', 'DELIVERED']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

exports.productModel = mongoose.model('prod', prodSchema);
exports.OrderModel = mongoose.model('order', orderSchema);
