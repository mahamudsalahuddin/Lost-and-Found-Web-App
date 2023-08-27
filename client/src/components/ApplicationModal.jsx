import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const ApplicationModal = (data) => {
  let [show, setShow] = useState(false);
  let [showApp, setShowApp] = useState(false);

  let [get, setGet] = useState({
    nid: "",
    mb: "",
  });
  let [err, setErr] = useState({
    nid: "",
    mb: "",
  });

  let navigate = useNavigate();
  const getInput = (e) => {
    const { name, value } = e.target;
    setGet({ ...get, [name]: value });
    setErr({ ...err, [name]: "" });
  };
  console.log(data.data.claimerName);
  const subMit = () => {
    const regex = /^01[3-9][0-9]{8}$/;
    const rege = /^[1-9][0-9]{9}$/;
    // if (get.nid === "") {
    //   setErr({ ...err, nid: "Required" });
    // } else if (get.mb === "") {
    //   setErr({ ...err, mb: "Required" });
    // } else if (!regex.test(get.mb)) {
    //   setErr({ ...err, mb: "Invalid Mobile Number" });
    // } else if (!rege.test(get.nid)) {
    //   setErr({ ...err, nid: "Invalid NID" });
    // } else {
    //   console.log(get);
    //   setShow(true);
    // }

    console.log(get);
    setShow(true);
  };

  //#### apply

  const applyF = async (e) => {
   console.log(e._id)
   console.log(get.nid,get.mb)
    try{
      const how = await axios.post("http://localhost:5000/lostFound/apply",{

      claimerName:e.claimerName,
      claimerEmail:e.claimerEmail,
      claimerURL:e.claimerURL,
      claimItemId:e.claimItemId,
      category:e.category,
      subcat:e.subcat,
      finderName:e.finderName,
      fiderId:e.fiderId,
      fiderURL:e.fiderURL,
      finderEmail:e.finderEmail,
      confirm:"pendding",
      opt:"",
      claimId:e._id,
      nid:get.nid,
      mb:get.mb,



      })
    }catch(err){
      console.error("Error:",err)
    }
    
    setShowApp(true);


    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  //#### apply
  //#### cancel
  const cancelFn = async () => {
    const low = await axios.post(
      "http://localhost:5000/lostFound/delapplication",
      {
        id: data.data._id,
        confirm: false,
      }
    );
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  //#### cancel
  return (
    <>
      <div className="bg-sky-500 absolute   w-full h-[340px] z-20 rounded-md border border-orange-600 shadow-2xl p-4 ">
        <div className="modal relative">
          <div className="modal-box">
            <label className="block mt-[2px] text-md font-medium text-orange-800 ">
              {!err.nid ? <p> Nation Id. Number</p> : <p>{err.nid}</p>}
            </label>
            <input
              onChange={getInput}
              name="nid"
              type="number"
              placeholder="NID"
              required
              className=" text-gray-900 text-sm  block w-[400px] p-2.5 bg-gray-700 rounded-md  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label className="block mt-[2px] text-md font-medium text-orange-800 ">
              {!err.mb ? <p> Mobile Number</p> : <p>{err.mb}</p>}
            </label>
            <input
              onChange={getInput}
              name="mb"
              type="number"
              required
              placeholder="cell number"
              className=" text-gray-900 text-sm  block w-[400px] p-2.5 bg-gray-700 rounded-md  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="w-[650px] border h-[100px] mt-3 p-2">
            <p className="text-gray-100 text-md font-serif font-semibold  ">
              আপনার পদপ্ত তথ্যাবলি পর্যবেক্ষন করা হবে। NID মাধ্যমে ওঠানো মোবাইল
              নম্বর ব্যবহার করুন ।{" "}
            </p>
          </div>
          <div className="absolute text-md hover:scale-105 duration-300 p-1 rounded-md bottom-[-60px] bg-sky-400 font-medium text-orange-800 left-[340px]">
            <button onClick={subMit}>Submit</button>
          </div>
        </div>
      </div>

      {show && (
        <div className="bg-[#FEE799] absolute   w-full h-[340px] z-20 rounded-md border border-orange-600 shadow-2xl p-4 ">
          <div className="modal relative">
            <div className="p-2 h-[300px] bg-no-repeat bg-center  bg-[url(bn.png)]  overflow-y-auto text-md font-semibold ">
              <p>
                আমি{" "}
                <span className="text-[#fa4b2c] ">{data.data.claimerName}</span>{" "}
               
              </p>{" "}
              <p> আমার NID: <span className="text-[#fa4b2c] ">{get.nid}</span> . </p>
              <p >
              Product : <span className="text-[#fa4b2c] ">{data.data.subcat}</span>{" "}
                Item Number:{" "}
                <span className="text-[#fa4b2c] ">
                  {data.data.claimItemId.slice(-6)}
                </span>{" "}
              </p>{" "}
              <p className="mb-8 mt-4">এই জিনিসটি আমার বলে দাবি করিলাম যথাযত প্রমানের মাধমে।</p>
              <p className="my-2">
                *প্রদত্ত তথ্য মিথ্যা / ভুল হলে আমার দাবি বাতিল হবে ।
              </p>{" "}
              <p> *সকল শর্ত মানিয়া নিলাম ।</p>
              <div className="w-full mt-6 text-md  p-2  flex justify-between items-center  font-bold text-orange-800 ">
                <button
                  className="w-40 h-8 hover:scale-105 duration-300 rounded-md bg-sky-400 "
                  onClick={cancelFn}
                >
                  বাতিল
                </button>
                <button
                  className="w-40 h-8 hover:scale-105 duration-300 rounded-md bg-sky-400 "
                  onClick={()=>applyF(data.data)}
                >
                  গ্রহণ করিলাম
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showApp && (
        <div className="bg-[#4CAF50] absolute flex justify-center items-center  w-full h-[340px] z-20 rounded-md border border-orange-600 shadow-2xl p-4 ">
          <p className="text-gray-100 text-2xl font-serif font-semibold  ">
            আপনার আবেদন গ্রহণ করা হয়েছে।
          </p>
        </div>
      )}
    </>
  );
};

export default ApplicationModal;
