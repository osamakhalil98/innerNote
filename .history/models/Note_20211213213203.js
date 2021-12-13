const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StatSchema = new Schema({
  angry: {
    type: Number,
    default: 0,
    required: 0,
  },
  like: {
    type: Number,
    default: 0,
    required: 0,
  },
  sad: {
    type: Number,
    default: 0,
    required: 0,
  },
  love: {
    type: Number,
    default: 0,
    required: 0,
  },
});
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
  stats: StatSchema,
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);