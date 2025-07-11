const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  normalize_name:{
    type:String,
    required:true,
    index:true // for faster search
  },
  bio: {
    type: String,
  },
  dob: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);
