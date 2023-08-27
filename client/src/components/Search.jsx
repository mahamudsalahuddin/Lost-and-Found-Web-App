import React, { useState } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Search = (postList) => {
  const [trans, setTrans] = useState("");
  const logOn = (data) => {
    setTrans(data);
  };
  let reduxReturnData = useSelector((state) => state);

  console.log(typeof postList);
  return (
    <div className="  h-[500px] overflow-y-auto  p-[14px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
      <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Match Items
      </h5>
      <div className="flex gap-x-4 mt-2 flex-wrap">
        {postList.shareData &&
          postList.shareData.map((data, i) => (
            <div
              key={i}
              // onClick={(item) => (setMyPostCard(true),console.log(item))}
              onClick={() => logOn(data)}
              className="rounded-md flex items-center gap-x-4 mb-[10px] hover:scale-110 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
            >
              <div>
                <div className="  border rounded-lg shadow-2xl items-center flex h-[80px] pl-1 space-x-2">
                  <div key={i} className="flex-shrink-0">
                    <img
                      className="w-12 h-12 rounded-sm"
                      src={data.itImage[0]}
                      alt={""}
                    />
                  </div>

                  <div className="flex-1 min-w-[140px]">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {data.category}
                    </p>
                    <p className="text-sm text-cyan-500 truncate dark:text-cyan-400">
                      {data.subcat}
                    </p>
                    <p className="text-[10px] text-cyan-500 truncate dark:text-cyan-400">
                      {data.location}
                    </p>
                  </div>
                </div>
              </div>

              {reduxReturnData.userStoreData.userInfo.email === data.email && (
                <button
                  type="button"
                  className="h-10 rounded-md bg-danger px-5 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                >
                  <span className="h-2 w-2 text-orange-500">আমার</span>
                </button>
              )}
            </div>
          ))}
        {trans && (
          <div
            className=" fixed top-[30px] right-[110px] w-[750px]  "
            style={{ height: "500px" }}
          >
            <Card dat={trans} />

            <button
              onClick={() => setTrans(!trans)}
              className="w-[20px]  rounded-full absolute top-[45px] right-[5px] z-30  h-[20px]  text-red-700 hover:text-white  hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm   dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-800 "
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
