const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
