import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cardx = (dat) => {
  const [slideUrl, setSlideUrl] = useState("");
  let [getOtp, setGetOpt] = useState({
    otp: " ",
  });
  let [commGet, setComm] = useState({
    mess: "",
    rate: 0,
  });

  let reduxReturnData = useSelector((state) => state);
  let navigate = useNavigate();

  const picClick = (e) => {
    setSlideUrl(e.target.src);
  };
  const [applyget, setApplyget] = useState("");
  useEffect(() => {
    const otP = async () => {
      const how = await axios.get("http://localhost:5000/lostFound/applyget");
      let arr = [];
      how.data &&
        how.data.forEach((item) => {
          if (
            item.claimerEmail ===
              reduxReturnData.userStoreData.userInfo.email &&
            item.itemId === dat.dat[0]._id
          ) {
            arr.push(item);
          }

          console.log(arr);
        });
      setApplyget(arr);
    };
    otP();
  }, []);

  // otp function

  const getOptfromInput = (e) => {
    const { name, value } = e.target;
    setGetOpt({ ...getOptfromInput, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:5000/lostFound/otpclaimer", {
      itemId: applyget[0].itemId,
      opt: getOtp.otp,
      claimerEmail: reduxReturnData.userStoreData.userInfo.email,
      id: applyget[0]._id,
    });

    setTimeout(() => {
      window.location.reload()
    }, 500);
  };
  // claimer thank comment
  const commentSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/lostFound/history", {
      claimerEmail: reduxReturnData.userStoreData.userInfo.email,
      id: applyget[0]._id,
      mess: commGet.mess,
      rate: commGet.rate,
    });
    console.log(commGet);
    //
    setTimeout(() => {
      history.go();
    }, 500);
  };
  const commFromClaimer = (e) => {
    const { name, value } = e.target;
    setComm({ ...commGet, [name]: value });
  };
  return (
    <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10 h-[500px] relative md:max-w-[850px] flex  ">
      <div className=" w-[50%]  dark:bg-gray-700 h-full">
        <div className="h-[400px] flex items-center justify-center">
          <img
            className="w-[330px] rounded-lg object-cover  shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ease-in-out duration-500 hover:scale-110  "
            src={slideUrl}
            alt="Product Image 1"
          />
        </div>

        <div className="w-full h-full border-t-2 rounded-lg ">
          <div className="  mt-[14px] mx-6 h-[180px] w-[95%] flex  flex-wrap">
            {dat.dat[0].itImage &&
              dat.dat[0].itImage.map((url, i) => (
                <img
                  key={i}
                  onClick={(e) => picClick(e)}
                  className=" rounded-sm h-[70px] w-[70px] mx-[10px] object-cover  shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] cursor-pointer ease-in-out duration-500 hover:rotate-6 hover:scale-125 "
                  src={url}
                  alt=""
                />
              ))}
          </div>
        </div>
      </div>
      <div className="h-full dark:bg-gray-800 w-1/2 p-4">
        <div className="block max-w-sm  p-2 bg-white border h-full border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className=" text-xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white">
            Product Info
          </h3>
          <div className="w-[70%]  border border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              Category
            </h1>
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
              {dat.dat[0].category}
            </p>
          </div>
          <div className="w-[70%] border mt-1 border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              Sub-Category
            </h1>
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
              {dat.dat[0].subcat}
            </p>
          </div>
          <div className="w-[70%] border mt-1 border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              Location
            </h1>
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
              {dat.dat[0].location}
            </p>
          </div>
          <div className="w-[70%] border mt-1 border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
              Produc Detail
            </h1>
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
              {dat.dat[0].detail}
            </p>
          </div>
          <div className="w-[70%] border-1 mt-2 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <div className="flex items-center h-[80px] pl-4 space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={dat.dat[0].useImg ? dat.dat[0].useImg : "react.svg"}
                  alt="Bonnie image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {dat.dat[0].name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  "Hey I found this Product" Id:{" "}
                  {JSON.stringify(dat.dat[0]._id).slice(-9)}
                </p>
              </div>
            </div>
          </div>
          <div className="w-[70%] border-1 mt-2 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <div className="h-[80px] pl-4 ">
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                Id: {JSON.stringify(dat.dat[0]._id).slice(-9)}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-2">
                Status: {applyget && applyget[0].confirm}
              </p>
              {applyget && applyget[0].confirm == "approved" && (
                <form onSubmit={commentSubmit}>
                  <select
                    onChange={commFromClaimer}
                    name="rate"
                    className="w-[60px] h-[30px] text-orange-500 bg-slate-50 rounded-md pl-4 "
                  >
                    <option selected>0</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                  </select>{" "}
                  <span className="text-orange-400 text-sm font-semibold">
                    Rating Him
                  </span>
                  <input
                    onChange={commFromClaimer}
                    type="text"
                    name="mess"
                    className="w-full h-[30px] bg-slate-50 rounded-md pl-4 mt-1"
                    placeholder="Thank to Finder"
                  />
                  <button type="submit"></button>
                </form>
              )}
              {applyget && applyget[0].opt && (
                <form onSubmit={handleSubmit}>
                  <input
                    onChange={getOptfromInput}
                    type="number"
                    name="otp"
                    className="w-full h-[40px] bg-slate-50 rounded-md pl-4 "
                    placeholder="Enter OTP code"
                  />
                  <button type="submit"></button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardx;
