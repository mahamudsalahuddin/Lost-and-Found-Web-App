import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [productsData, setProductsData] = useState("");

  const [histo, setHisto] = useState("");
  const [can, setCan] = useState("");
  const [push, setPush] = useState("");

  //push data
  const handlePush = (info) => {

    
    setPush(info);
  };

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(" http://localhost:5000/lostFound/applyget");
      if (how.data.length > 0) {
        setProductsData(how.data);
      }
    };
    getApplication();

  }, []);

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(" http://localhost:5000/lostFound/histoget");
      if (how.data.length > 0) {
        setHisto(how.data);
      }
    };
    getApplication();
  }, []);
  console.log(histo);

  useEffect(() => {
    const getApplication = async () => {
      const how = await axios.get(" http://localhost:5000/lostFound/cancelget");
      if (how.data.length > 0) {
        setCan(how.data);
      }
    };
    getApplication();
  }, []);
  console.log(can);

  const handleProductClick = async (product) => {
    setPush(product);
    await axios.post("http://localhost:5000/lostFound/emailveri", {
      email: product.claimerEmail,
      itemId: product.itemId,
      appId: product._id,
    });
  };

  return (
    <div className="bg-[#767889] w-full flex   h-screen">
      <div className="w-64 bg-gray-800 h-screen text-white p-4">
        <div className=" mt-8 ">
          {push && (
            <>
              <span className="text-cyan-400 mb-[2]">
                {push.confirm === "cancel" ? (
                  <p>Reject Claimer</p>
                ) : push.opt ? (
                  <p>Claimer Request</p>
                ) : (
                  <p>Owner</p>
                )}
              </span>
              <p className="text-[14px] font-semibold font-sans ">
                {push.claimerName}
              </p>
              <p className="text-[14px] font-semibold font-sans ">
                {push.finderEmail}
              </p>
              <span className="text-cyan-400 mt-[2]">Finder</span>
              <p className="text-[14px] font-semibold font-sans ">
                {push.finderName}
              </p>
              <p className="text-[14px] font-semibold font-sans ">
                {push.finderEmail}
              </p>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.fiderId}
              </p>

              <span className="text-cyan-400 mt-[2]">Product Details</span>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.category}
              </p>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.subcat}
              </p>
              <p className="text-[14px] font-semibold font-sans mb-[2px]">
                {push.claimId}
              </p>
              {push.mess && (
                <p className="text-[14px] font-semibold font-sans mb-[2px]">
                  message: {push.mess}
                </p>
              )}
              {push.rate && (
                <p className="text-[14px] font-semibold font-sans mb-[2px]">
                  Rate: {push.rate}
                </p>
              )}
              {push.confirm && (
                <p className="text-[14px] font-semibold font-sans mb-[2px]">
                  status: {push.confirm}
                </p>
              )}
              {push.opt && (
                <p className="text-[14px] font-semibold font-sans mb-[2px] text-cyan-400">
                  OTP sent: {push.opt}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className=" flex flex-col flex-1">
        <nav className="flex items-center justify-between bg-gray-900 px-4 py-3">
          <div className="text-white font-bold text-xl">Admin Page</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Dashboard
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Settings
            </a>
            {/* Add more links for navigation */}
          </div>
        </nav>
        <div className="flex-1 bg-[#767889]  p-4">
          <div className="flex-1 bg[#CDF4E3] rounded-md p-4 ">
            <h2 className="text-2xl font-bold mb-4">All request</h2>
            <div className="w-[300px] rounded-md cursor-pointer shadow-md flex gap-x-[20px] relative">
              {productsData &&
                productsData.map(
                  (product) =>
                    product.confirm === "pendding" && (
                      <div
                        key={product.id}
                        className="bg-[#085140] text-white p-1 w-[320px] border-cyan-400 border-[1px] flex  "
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="bg-[#1F2937] border-gray-400 border-r-[1px]  w-[22%]">
                          <p className="text-[12px] font-medium mb-2">
                            {product.category}
                          </p>
                          <p className="text-[12px] font-medium mb-1">
                            {product.subcat}
                          </p>
                        </div>

                        <div className="bg-[#1F2937] text-center p-1 w-[78%]">
                          <p className="text-[12px] font-medium mb-1">
                            Email:{product.claimerEmail}
                          </p>
                          <p className="text-[12px] font-bold mb-1">
                            id:{JSON.stringify(product.itemId).slice(-9)}
                          </p>
                          <p className="text-[12px] font-bold mb-1">
                            Nid:{product.nid}
                          </p>
                          <p className="text-[12px] font-bold mb-1">
                            Mobile:{product.mb}
                          </p>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
          <div className="w-[700px] mt-14 border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Success
            </h5>
            <ul className="flex gap-x-4 flex-wrap">
              {histo &&
                histo.map((his, s) => (
                  <li
                    key={s}
                    className="rounded-md hover:scale-105 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                  >
                    <div
                      onClick={() => handlePush(his)}
                      className=" items-center flex h-[80px] pl-1 space-x-2"
                    >
                      <>
                        <div className="flex-shrink-0">
                          <img
                            className="w-12 h-12 rounded-sm"
                            src={his.itemURL}
                            alt="Bonnie image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {his.category}
                          </p>
                          <p className="text-sm text-cyan-500 truncate dark:text-cyan-400">
                            "{his.subcat}"
                          </p>
                          <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                            Owner: "{his.claimerName}"
                          </p>
                        </div>
                      </>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className="w-[700px] mt-14 border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Cancel
            </h5>
            <ul className="flex gap-x-4 flex-wrap">
              {can &&
                can.map((his, s) => (
                  <li
                    key={s}
                    className="rounded-md hover:scale-105 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                  >
                    <div
                      onClick={() => handlePush(his)}
                      className=" items-center flex h-[80px] pl-1 space-x-2"
                    >
                      <>
                        <div className="flex-shrink-0">
                          <img
                            className="w-12 h-12 rounded-sm"
                            src={his.itemURL}
                            alt="Bonnie image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {his.category}
                          </p>
                          <p className="text-sm text-cyan-500 truncate dark:text-cyan-400">
                            "{his.subcat}"
                          </p>
                          <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                            Owner: "{his.claimerName}"
                          </p>
                        </div>
                      </>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
