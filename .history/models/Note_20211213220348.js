const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/*const StatSchema = new Schema({
  angry: {
    type: Number,
    default: 0,
    required: false,
  },
  like: {
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
});*/

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
    uppercase: true,
  },
  email: {
    type: String,
    required: false,
    maxlength: 200,
    lowercase: true,
  },
  stats: {
    angry: {
      type: Number,
      default: 0,
      required: false,
    },
    like: {
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
  },
});

module.exports = mongoose.models.Note || mongoose.model("Note", NoteSchema);
