const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addingresturant = new Schema({
   name: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   Category: {
      type: String,
      required: true
   },
   imageURL: {
      type: String,
      required: true
   },
   location: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      required: true
   },
   createdAt: {
      type: Date,
      immutable: true,
      default: () => {
         return new Date();
      },
   },
   updatedAt: {
      type: Date,
      default: () => {
         return new Date();
      }
   }
   // }, { _id: false });
})

module.exports = mongoose.model("resturant", addingresturant);

// first parameter is the database collection name