const express = require("express");
const _ = express.Router();

const path = require("path");
const app = express();
const {
  postController,
  loginController,
  profielPic,
  getUserImg,
  getItemImg,
  uploadItem,
  uploadItemImg,
  getLostItemPost,
  upDate,
  getAllItemPost,
  claimFn,
  claimerDb,
  messagePost,
  claimerButton,
  messageGet,
  searchFn,
  myClaimPost,
  confirmFn,
  confdelFn,
  appDel,
  appFun,
  applGet,
  apforreceiveFn,
  emailVeri,
  otpclaimerFn,
  history,
  histogetFn,
  cancelHisfn,
} = require("../../controller/regiCon");

_.post("/regi", postController);
_.post("/login", loginController);
_.post("/profile", profielPic);
_.post("/userImg", getUserImg);
_.post("/itemupload", uploadItem);
_.post("/itemImg", uploadItemImg);
_.post("/getItImg", getItemImg);
_.post("/getpostlist", getLostItemPost);
_.post("/userupdate", upDate);
_.post("/getallpostlist", getAllItemPost);
_.post("/claim", claimFn);
_.get("/claimbd", claimerDb);
_.get("/messageget", messageGet);
_.get("/applyget", applGet);
_.get("/histoget", histogetFn);
_.get("/cancelget", cancelHisfn);

_.post("/claimerbuttonpost", claimerButton);
_.post("/messagepost", messagePost);
_.post("/searchpost", searchFn);
_.post("/claimpost", myClaimPost);
_.post("/confirm", confirmFn);
_.post("/confrimdelete", confdelFn);
_.post("/delapplication", appDel);
_.post("/apply", appFun);
_.post("/apforreceive", apforreceiveFn);
_.post("/emailveri", emailVeri);
_.post("/otpclaimer", otpclaimerFn);
_.post("/history", history);

module.exports = _;
