import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";



const MessReadModal = (dat) => {
 
  let reduxReturnData = useSelector((state) => state);
  console.log(dat);

  
  return (
    
            <div  size="A4" className="w-[320px]  lg:w-[630px] lg:h-[300px] border rounded-md bg-gray-800 lg:p-6 fixed z-30 lg:left-[330px] lg:bottom-[195px]">
              <div className="lg:w-[450px] p-2">
                <p className="text-[8px] lg:text-sm text-gray-100 font-sans font-normal lg:font-semibold  ">
                  আপনার প্রদত্ত জাতীয় পরিচয়পত্র এবং প্রদত্ত  
                </p>
                <p className="text-[8px] lg:text-sm text-gray-100 font-sans font-normal lg:font-semibold  ">
                মোবাইল নাম্বারের
                সত্যতা যাচাই করা হয়েছে , <br></br>ডিজিটাল পদ্ধতিতে।
                </p>
                <p className="text-[8px] lg:text-sm text-gray-100 font-sans font-normal lg:font-semibold mt-4 ">
                  যদি কোন তথ্য গোপন কিংবা প্রতারণার আশ্রয় গ্রহণ করে থাকেন ,
                </p>
                <p className="text-[8px] lg:text-sm text-gray-100 font-sans font-normal lg:font-semibold  ">
                  এ জন্য{" "}
                  <span className="font-bold text-[8px] lg:text-[16px] border-cyan-500 border rounded-md bg-slate-600 shadow-2xl cursor-pointer">
                    {" "}
                    Lost & Found{" "}
                  </span>
                  কোন ভাবেই দায়ী থাকবেনা।{" "}
                </p>

                <div className="mt-2 text-[10px] lg:text-[12px] flex flex-wrap gap-x-4 ">
                 <div> <span className="text-cyan-400 mt-[2]">Claimer</span>
                  <p className="text-[10px]   lg:text-[11px] font-semibold font-sans text-gray-100 ">
                    {dat.dat.claimerName}
                  </p>
                  <p className="text-[10px]  lg:text-[11px]  font-semibold font-sans text-gray-100 ">
                    {dat.dat.finderEmail}
                  </p></div>
                 <div> <span className="text-cyan-400 mt-[2]">Finder</span>
                  <p className="text-[10px] lg:text-[11px]  font-semibold font-sans text-gray-100">
                    {dat.dat.finderName}
                  </p>
                  <p className="text-[10px] lg:text-[11px]  font-semibold font-sans text-gray-100 ">
                    {dat.dat.finderEmail}
                  </p>
                  <p className="text-[10px]  lg:text-[11px] font-semibold font-sans text-gray-100 mb-[2px]">
                    {dat.dat.fiderId}
                  </p></div>

                  <div><span className="text-cyan-400 mt-[2]">Product Details</span>
                  <p className="text-[10px]  lg:text-[11px] font-semibold font-sans text-gray-100 mb-[2px]">
                    {dat.dat.category}
                  </p>
                  <p className="text-[10px]  lg:text-[11px] font-semibold font-sans text-gray-100 mb-[2px]">
                    {dat.dat.subcat}
                  </p>
                  <p className="text-[10px]  lg:text-[11px] font-semibold font-sans text-gray-100 mb-[2px]">
                    {dat.dat.claimId}
                  </p></div>
                </div>
              </div>
            </div>
         
  );
};

export default MessReadModal;
