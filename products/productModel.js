const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true
      },
      description: {
        type: String,
        required: true
      },
      originalPrice: {
        type: Number,
        required: true
      },
      offerPrice: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      rating: {
        rate: {
          type: Number,
          required: true,
          default: 0
        },
        count: {
          type: Number,
          required: true,
          default: 0
        }
      }
    },
    { timestamps: true }
  );
  
  const Product = model("product", productSchema);
  
  module.exports = Product;