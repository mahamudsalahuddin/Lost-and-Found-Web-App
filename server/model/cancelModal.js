const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const appSchema = new Schema({
  claimerName: { type: String },
  claimerEmail: { type: String },
  claimerURL: { type: String },
  category: { type: String },
  subcat: { type: String },
  finderName: { type: String },
  fiderId: { type: String },
  fiderURL: { type: String },
  itemURL: { type: String },
  nid: { type: String },
  mb: { type: String },
  finderEmail: { type: String },
  confirm: {
    type: String,
    default: "pendding",
    required: ["pendding", "approved", "cancel"],
  },
  opt: { type: Number },
  claimId: { type: Schema.Types.ObjectId, ref: "Claim" },
  itemId: { type: Schema.Types.ObjectId, ref: "Lostitempost" },
});

module.exports = mongoose.model("Cancelhis", appSchema);
