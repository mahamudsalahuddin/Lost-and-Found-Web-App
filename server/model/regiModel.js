const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const regiSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  pass: {
    type: String,
    require: true,
  },
  userImg: {
    type: String,
  },
  lostpost_id: [
    {
      type: Schema.Types.ObjectId,
      ref: " lostitempost",
    },
  ],
});

module.exports = mongoose.model("Userinfo", regiSchema);
