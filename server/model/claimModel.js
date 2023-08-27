const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const claimSchema = new Schema({
  claimerName: { type: String },
  claimerEmail: { type: String },
  claimerURL: { type: String },
  claimItemId: { type: String },
  category: { type: String },
  subcat: { type: String },
  finderName: { type: String },
  fiderId: { type: String },
  fiderURL: { type: String },
  finderEmail: { type: String },
  confirm: { type: Boolean, default: false },
});

module.exports = mongoose.model("Claim", claimSchema);
