const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const Userinfo = require("../model/regiModel");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Lostitempost = require("../model/lostPostModel");
const Itemhelper = require("../model/itmHelperModel");
const Claim = require("../model/claimModel");
const Chat = require("../model/chatModal");
const Application = require("../model/applicationModel");
const History = require("../model/delrevModel");
const Cancelhis = require("../model/cancelModal");
const emailV = require("../utils/emailverfy");
const { generateAndCopyOTP } = require("../utils/optgen");

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const postController = async (req, res) => {
  const { name, email, pass, photoURL } = req.body;
  bcrypt.hash(pass, 5, function (err, hash) {
    let mongo = new Userinfo({
      name,
      email,
      pass: hash,
      userImg: photoURL,
    });
    mongo.save();
  
    res.send(mongo);
  });
};

const loginController = async (req, res) => {
  const { email, pass } = req.body;

  const how = await Userinfo.find({ email });
  if (how.length != 0) {
   
    bcrypt.compare(pass, how[0].pass, function (err, result) {
      if (result == true) {
        res.json({
          success: "Login Success",
          displayName: how[0].name,
          email: how[0].email,
          userImg: how[0].photo ? how[0].photo : null,
        });
      }
    });
  } else {
    res.json({ Error: "Invalid Information" });
  }
};

const profielPic =
  (upload.single("image"),
  async (req, res) => {
    const { email, userImg, cloudinary_id } = req.body;

    const result = await cloudinary.uploader.upload(
      userImg,
      { public_id: email },
      (error, result) => {
        res.send(result);
      }
    );
    await Userinfo.findOneAndUpdate(
      { email: email },
      { userImg: result.secure_url },
      { new: true }
    );
  });
//##### get ##############################get##########
const getUserImg = async (req, res) => {
  const { email } = req.body;
  await Userinfo.find({ email }).then((data) => {
    res.send(data);
  });
};
const getItemImg = async (req, res) => {
  const { email } = req.body;
  try {
    const how = await Itemhelper.find({ email });
    if (!how.length > 0) {
      res.jason({ error: "Kindly Upload Item image" });
    }
    res.send(how);
  } catch (err) {
    res.send(err);
  }
};

const getLostItemPost = async (req, res) => {
  const { email } = req.body;
  try {
    const how = await Lostitempost.find({ email });
    if (how.length > 0) {
      res.send(how);
    } else {
      res.json({ error: "Ki j hoyce" });
    }
  } catch (err) {
    res.json({ error: "Not success" });
  }
};
const getAllItemPost = async (req, res) => {
  try {
    const how = await Lostitempost.find({});
    if (how.length > 0) {
      res.send(how);
    } else {
      res.json({ error: "Ki j hoyce" });
    }
  } catch (err) {
    res.json({ error: "Not success" });
  }
};
///#################  claimer Database start###########
const claimFn = async (req, res) => {
  const {
    claimerName,
    claimerEmail,
    claimerURL,
    claimItemId,
    category,
    subcat,
    finderName,
    fiderId,
    fiderURL,
    finderEmail,
  } = req.body;

  const low = await Claim.find({ claimItemId, claimerEmail });

  if (low.length < 1) {
    const cret = new Claim({
      claimerName,
      claimerEmail,
      claimerURL,
      claimItemId,
      category,
      subcat,
      finderName,
      fiderId,
      fiderURL,
      finderEmail,
    });

    cret
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.json({ error: "Already calimed " });
  }
};

const claimerDb = async (req, res) => {
  try {
    const how = await Claim.find({});
    res.send(how);
  } catch (err) {
    res.send(err);
  }
};
///#################  claimer Database end###########
//##### get ##############################get end##########

const uploadItem = async (req, res) => {
  const {
    name,
    email,
    userImg,
    category,
    subcat,
    detail,
    location,
    itImage,
    postlist_id,
  } = req.body;
  const how = await Userinfo.find({ email });
  const low = await Itemhelper.find({ email });
  if (how.length > 0 && low.length > 0) {
    const create = new Lostitempost({
      email,
      category,
      subcat,
      detail,
      location,
      itImage: low[0].itImage,
      postlist_id: how[0]._id,
      userImg,
      name: how[0].name,
    });
    create.save();
    await Itemhelper.findByIdAndDelete({ _id: low[0]._id });

    await Userinfo.findOneAndUpdate(
      { email },
      { $push: { lostpost_id: create._id } }
    );

    res.json({ message: "Done" });
  } else {
    res.json({ error: "Kindly add item images" });
  }
};

const uploadItemImg =
  (upload.array("images", 4),
  async (req, res) => {
    const { email, itImage } = req.body;

    const imgUrl = [];

    for (const pic of itImage) {
      const result = await cloudinary.uploader.upload(pic);
      imgUrl.push(result.secure_url);
    }
    const create = new Itemhelper({
      email: email,
      itImage: imgUrl,
    });
    create.save().then((result) => {
      res.send(result);
    });
  });

const upDate = async (req, res) => {
  const { email } = req.body;
  let how = await Userinfo.find({ email });
  if (how.length != 0) {
    res.send(how[0].userImg);
  } else {
    res.json({ error: "errro" });
  }
};
//############## chatting  start #####
const messagePost = async (req, res) => {
  const { postId, reciverEmail, senderEmail, mess } = req.body;

  const cert = new Chat({
    postId,
    reciverEmail,
    senderEmail,
    mess,
  });

  cert.save();
  const how = await Lostitempost.findOneAndUpdate(
    { _id: postId },
    { $push: { message: cert._id } },
    { new: true }
  );
  const low = await Chat.findOneAndUpdate(
    { _id: cert._id },
    { $set: { id: how._id } },
    { new: true }
  );
  res.send(low);
};

const messageGet = async (req, res) => {
  const how = await Chat.find({});
  res.send(how);
};
//############## chatting  end #####
//############ claimer button start ######
const claimerButton = async (req, res) => {
  const { claimItemId } = req.body;
  const how = await Claim.find({ claimItemId });
  res.send(how);
};

const myClaimPost = async (req, res) => {
  const { email } = req.body;

  const how = await Claim.find({ claimerEmail: email });

  if (how.length > 0) {
    const arr = [];
    const low = await Lostitempost.find({});
    low.forEach((i) => {
      how.forEach((j) => {
        if (i._id == j.claimItemId) {
          arr.push(i);
        }
      });
    });

    res.send(arr);
  }
};
//############ claimer button end ######
//############ search fun start ######
const searchFn = async (req, res) => {
  const { category, subcat, detail, location, search } = req.body;

  if (search !== "") {
    const how = await Lostitempost.find({
      $or: [
        { category: { $regex: search, $options: "i" } },
        { subcat: { $regex: search, $options: "i" } },
        { detail: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ],
    });
    if (how.length > 0) {
      res.send(how);
    } else {
      res.json({ Error: "Not Match" });
    }
  }
};
//############ search fun end ######
//############ confirm fun starrt ######
const confirmFn = async (req, res) => {
  const { id, confirm } = req.body;

  const how = await Claim.findOneAndUpdate(
    { _id: id },
    { $set: { confirm: confirm } },
    { new: true }
  );
  res.send(how);
};

const confdelFn = async (req, res) => {
  const { claimItemId } = req.body;

  const low = await Claim.find({ claimItemId: claimItemId, confirm: true });

  if (low.length > 0) {
    res.send(true);
  } else {
    res.send(false);
  }
};
//############ confirm fun end ######
//############ application fun start ######
const appDel = async (req, res) => {
  const { id, confirm } = req.body;
  const how = await Claim.findOneAndUpdate(
    { _id: id },
    { $set: { confirm: confirm } },
    { new: true }
  );
  res.send(how);
};
//############ application del fun end ######
//############ Apply for product veri fun start ######
const appFun = async (req, res) => {
  const {
    claimerName,
    claimerEmail,
    claimerURL,
    claimItemId,
    category,
    subcat,
    finderName,
    fiderId,
    fiderURL,
    finderEmail,
    confirm,
    opt,
    claimId,
    nid,
    mb,
  } = req.body;

  const crt = new Application({
    claimerName: claimerName,
    claimerEmail: claimerEmail,
    claimerURL: claimerURL,
    itemId: claimItemId,
    category: category,
    subcat: subcat,
    finderName: finderName,
    fiderId: fiderId,
    fiderURL: fiderURL,
    finderEmail: finderEmail,
    confirm: confirm,
    opt: opt,
    claimId: claimId,
    nid: nid,
    mb: mb,
  });

  crt.save();

  if (crt.claimId !== "") {
    await Claim.findByIdAndDelete({ _id: crt.claimId });
    res.send("Application successfully submitted");
  } else {
    res.send("Error");
  }
};
// fetch
const applGet = async (req, res) => {
  const how = await Application.find({});
  if (how.length > 0) {
    res.send(how);
  }
};

//apforreceive post

const apforreceiveFn = async (req, res) => {
  const { id } = req.body;

  const how = await Lostitempost.find({ _id: id });

  if (how.length > 0) {
    res.send(how);
  } else {
    res.send("No data found");
  }
};
//############ Apply for product veri fun end ######
//############ email verifi start  and otp match not match ######

const emailVeri = async (req, res) => {
  const { email, itemId, appId } = req.body;
  const otp = generateAndCopyOTP();
  console.log(otp);
  const how = await Application.findOneAndUpdate(
    { _id: appId },
    { $set: { opt: otp } },
    { new: true }
  );

  emailV(email, otp, "Verification");
};

const otpclaimerFn = async (req, res) => {
  const { itemId, opt, claimerEmail, id } = req.body;

  const how = await Application.find({
    itemId: itemId,
    opt: opt,
    claimerEmail: claimerEmail,
  });

  if (how.length > 0) {
    await Application.updateMany(
      { _id: id },
      { $set: { confirm: "approved", opt: null } },
      { new: true }
    );
    emailV(claimerEmail, "Your application approved", "Verification Succeed");
    res.send("Verification Succeed ");
  } else {
    await Application.updateMany(
      { _id: id },
      { $set: { confirm: "cancel", opt: null } },
      { new: true }
    );
  }

  setTimeout(async () => {
    const how = await Application.find({
      _id: id,
      confirm: "cancel",
      opt: null,
    });

    if (how.length > 0) {
      const cd = await new Cancelhis({
        claimerName: how[0].claimerName,
        claimerEmail: how[0].claimerEmail,
        claimerURL: how[0].claimerURL,
        itemId: how[0].claimItemId,
        category: how[0].category,
        subcat: how[0].subcat,
        finderName: how[0].finderName,
        fiderId: how[0].fiderId,
        fiderURL: how[0].fiderURL,
        itemURL: how[0].itemURL,
        finderEmail: how[0].finderEmail,
        confirm: "cancel",
        opt: null,
        claimId: how[0].claimId,
        nid: how[0].nid,
        mb: how[0].mb,
      });
      cd.save();

      await Application.findByIdAndDelete({ _id: id });
    }
  }, 4000);
};

//############ email verifi end ######
//############ thankComment history start ######
const history = async (req, res) => {
  const { claimerEmail, id, mess, rate } = req.body;

  const how = await Application.find({
    _id: id,
    claimerEmail: claimerEmail,
  });
  console.log(how[0].finderEmail);
  const lu = await Lostitempost.find({ _id: how[0].itemId });
  if (how.length > 0 && lu.length > 0) {
    const crt = new History({
      claimerName: how[0].claimerName,
      claimerEmail: how[0].claimerEmail,
      claimerURL: how[0].claimerURL,
      itemURL: lu[0].itImage[0],
      category: how[0].category,
      subcat: how[0].subcat,
      finderName: how[0].finderName,
      fiderId: how[0].fiderId,
      fiderURL: how[0].fiderURL,
      finderEmail: how[0].finderEmail,
      mess: mess,
      rate: how[0].rate,
    });
    crt.save();

    await History.findOneAndUpdate(
      { _id: crt._id },
      { $set: { rate: rate } },
      { new: true }
    );
    res.send(crt);
    setTimeout(async () => {
      await Application.findByIdAndDelete({ _id: how[0]._id });
    }, 5000);
    setTimeout(async () => {
      await Lostitempost.findByIdAndDelete({ _id: lu[0]._id });
    }, 6000);
  }
};
//### histoget fn **
const histogetFn = async (req, res) => {
  const how = await History.find({});
  console.log(how.length);
  if (how.length > 0) {
    res.send(how);
  } else {
    res.json({ error: "No Data found" });
  }
};
//############ thankComment history end ######
//########## cancelget fun start####
const cancelHisfn = async (req, res) => {
  const how = await Cancelhis.find({});
  console.log(how.length);
  if (how.length > 0) {
    res.send(how);
  } else {
    res.json({ error: "No Data found" });
  }
};

//########## cancelget fun end####
module.exports = {
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
  messageGet,
  claimerButton,
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
};
