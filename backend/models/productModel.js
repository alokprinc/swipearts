const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product name"],
    trim: true,
  },
  productTags: [
    {
      tag: {
        type: String,
      },
    },
  ],

  shortDescription: {
    type: String,
    required: [true, "Please Enter product shot description"],
  },
  longDescription: {
    type: String,
    required: [true, "Please Enter product long description"],
  },

  productRegularPrice: {
    type: Number,
    required: [true, "Please Enter product regular price"],
    maxLength: [8, "Price cannot exceed 8 figures "],
  },
  productSalePrice: {
    type: Number,
    required: [true, "Please Enter product sale price"],
    maxLength: [8, "Price cannot exceed 8 figures "],
  },

  rating: {
    type: Number,
    default: 0,
  },

  mainImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  otherImages: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: true,
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [5, "Stocks cannot exceed 5 characters"],
    default: 1000,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", productSchema);
