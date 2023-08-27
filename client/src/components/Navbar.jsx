import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { activeUser } from "../slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MessReadModal from "./MessReadModal";
import Donate from "./Donate";

const Navbar = ({ menuOpen }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let reduxReturnData = useSelector((state) => state);
  let [open, setOpen] = useState(false);
  let [mess, setMess] = useState(false);
  let [info, setInfo] = useState("");
  let [dat, setDat] = useState("");
  let [dot, setDot] = useState(false);

  let logOut = () => {
    localStorage.removeItem("userInfo");
    dispatch(activeUser(null));
    console.log("Sing Out from:", window.location.pathname.split("/")[1]);
    navigate("/login");
  };

  //#### get application for mess start####
  const handleOpen = () => {
    setOpen(!open);
    setMess(false);
  };

  useEffect(() => {
    const getApp = async () => {
      const how = await axios.get("http://localhost:5000/lostFound/applyget");
      let arr = [];
      how.data &&
        how.data.forEach((item) => {
          if (
            (item.claimerEmail ===
              reduxReturnData.userStoreData.userInfo.email &&
              item.confirm === "approved" &&
              item.opt === null) ||
            (item.finderEmail ===
              reduxReturnData.userStoreData.userInfo.email &&
              item.confirm === "approved" &&
              item.opt === null)
          ) {
            arr.push(item);
          }

          console.log(arr);
        });
      setInfo(arr);
    };
    getApp();
  }, []);
  console.log(info);

  // mess modal open ##
  const handleRead = (e) => {
    setMess(e._id);
    setDat(e);
    console.log(e);
  };
  //#### get application for mess end####
  //#### donate fun####
  const donateFn = () => {
    setDot(!dot);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900  w-full top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl md:flex flex-wrap items-center hidden md:block justify-between mx-auto p-4">
          <div>
            <img
              src="lost.png"
              className="h-5 sm:h-8 mr-3 rounded-md opacity-70"
              alt="Flowbite Logo"
            />
          </div>
          <div className="w-[300px] flex justify-between  ">
            <div className="  mt-2 flex gap-x-6 ">
              <a
                href="/user"
                className="text-gray-400 font-sans font-semibold "
              >
                <img
                  className="w-[30px] h-[30px]"
                  src="icons8-left-arrow-48.png"
                />
              </a>
              <a
                href="/home"
                className="text-gray-400 font-sans font-semibold "
              >
                <img
                  className="w-[30px] h-[30px]"
                  src="icons8-right-arrow-48.png"
                />
              </a>
            </div>
            <div
              onClick={handleOpen}
              className="relative  cursor-pointer "
            >
              {" "}
              {info.length > 0 && (
                <span className=" absolute right-[5px] top-[4px] w-[30px] rounded-md h-[30px] opacity-75 bg-cyan-400 animate-ping scale-105 duration-300 ease-in"></span>
              )}
              <img
                className="w-[40px] h-[40px] hover:scale-105 duration-500"
                src="mess.png"
              />
            </div>
          </div>
          <button
            onClick={donateFn}
            className="rounded-xl bg-cyan-500 px-5 py-2 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-orange-700 dark:hover:bg-cyan-300 dark:active:bg-cyan-200"
          >
            Donate Now
          </button>
          <button
            type="button"
            onClick={logOut}
            className="inline-block rounded-full bg-danger px-5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
          >
            <svg
              className="h-4 w-4 text-red-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
          </button>
        </div>

        <div className="max-w-screen-xl flex flex-wrap items-center block md:hidden justify-between mx-auto p-4">
          <div>
            <img
              src="lost.png"
              className="h-8 sm:h-8 mr-3 rounded-md opacity-70"
              alt="Flowbite Logo"
            />
          </div>

          <button
            type="button"
            onClick={menuOpen}
            className="inline-block rounded-full bg-danger px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
          >
            <img className="h-[25px] bg-gray-400 rounded-lg " src="bar.svg" />
          </button>
        </div>
      </nav>

      {open && (
        <div className="container rounded-md z-20 flex mx-auto  items-center fixed justify-end mr-[100px]">
          <ul className="flex flex-col bg-gray-300 rounded-md  p-4">
            {info &&
              info.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleRead(item)}
                  className="border-gray-400 flex flex-row mb-2"
                >
                  <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                      new
                    </div>
                    <div className="flex-1 pl-1 mr-16">
                      <div className="font-medium">{item.category}</div>
                      <div className="text-gray-600 text-sm">{item.subcat}</div>
                    </div>
                    <div className="text-gray-600 text-xs">
                      {new Date().getFullYear() +
                        "-" +
                        (new Date().getMonth() + 1) +
                        "-" +
                        new Date().getDate()}
                      <p>
                        {" "}
                        as{" "}
                        {item.claimerEmail ===
                        reduxReturnData.userStoreData.userInfo.email ? (
                          <span>Claimer</span>
                        ) : (
                          <span>Finder</span>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}

            <p
              className=" cursor-pointer text-end text-sm font-bold font-sans p-[1px] text-red-600"
              onClick={() => (setOpen(false), setMess(false))}
            >
              {info.length == 0 ? <p>No Message Close</p> : <p>Close</p>}
            </p>
          </ul>
        </div>
      )}

      {mess && (
        <div className="w-full">
          {" "}
          <MessReadModal dat={dat} />{" "}
        </div>
      )}

      {dot && <Donate />}
    </div>
  );
};

export default Navbar;
