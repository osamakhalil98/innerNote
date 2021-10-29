const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  name: {
    type: String,
    required: false,
    maxlength: 200,
  },
  message: {
    type: String,
    required: true,
    maxlength: 2400,
    unique: true,
  },
  noteName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  noteType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    maxlength: 200,
  },
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
