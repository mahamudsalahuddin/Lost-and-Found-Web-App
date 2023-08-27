const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  postId: { type: String },
  reciverEmail: { type: String },

  senderEmail: { type: String },

  mess: { type: String },
  id: {
    type: Schema.Types.ObjectId,
    ref: " Lostitempost",
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", chatSchema);
