const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemHelperSchema = new Schema({
  email: {
    type: String,
  },
 
  
  itImage: [{
    type: String,
    require:true
  }],
});

module.exports = mongoose.model("Itemhelper", itemHelperSchema);