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
  angry: {
    type: Number,
    default: 0,
    required: false,
  },
  sad: {
    type: Number,
    default: 0,
    required: false,
  },
  love: {
    type: Number,
    default: 0,
    required: false,
  },
  like: {
    type: Number,
    default: 0,
    required: false,
  },
});

module.exports = mongoose.models
  ? mongoose.models.Note
  : mongoose.model("Note", NoteSchema) || mongoose.model("Note", NoteSchema);
