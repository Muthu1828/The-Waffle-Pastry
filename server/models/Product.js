const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Cakes', 'Waffles', 'Pastries', 'Specials']
  },
  countInStock: {
    type: Number,
    required: [true, 'Please add stock level'],
    default: 10
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
