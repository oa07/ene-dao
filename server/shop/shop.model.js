const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true
  },
  shopLogo: {
    type: String,
    required: true
  },
  shopLocation: {
    type: String,
    required: true
  },
  products: [
    {
      prodID: {
        type: String,
        required: true
      },
      prodUnitPrice: {
        type: Number,
        required: true
      },
      popularity: {
        type: Number,
        default: 0
      }
    }
  ],
  popularity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

exports.shopModel = mongoose.model('shop', shopSchema);
