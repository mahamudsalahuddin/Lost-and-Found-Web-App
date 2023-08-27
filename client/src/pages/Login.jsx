import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { activeUser } from "../slice/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  let [data, setData] = useState({
    email: "",
    pass: "",
  });
  let [errorData, setError] = useState({
    name: "",
    email: "",
    genErr: "",
  });
  let [iCon, setIcon] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let reduxReturnData = useSelector((state) => state);
  // ############################### handle Change function start#####
  let handleChk = (e) => {
    let { name, value } = e.target;

    setData({ ...data, [name]: value });
  };
  // ############################### handle Change function endt#####

  //##### Page Navigate Start ####
  useEffect(() => {
    if (Boolean(reduxReturnData.userStoreData.userInfo) === true) {
      navigate("/user");
    }
  }, []);
  //##### Page Navigate End ####
  // ############################### handle submit function start#####
  let handelSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    await axios
      .post("http://localhost:5000/lostFound/login", {
        pass: data.pass,
        email: data.email,
      })
      .then((res) => {
        if (!res.data.Error) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          dispatch(activeUser({ user: res.data }));
          console.log(res);
          navigate("/user");
        } else {
          setError({ ...errorData, genErr: res.data.Error });
        }
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  // ############################### handle submit function endt#####

  // ############################### handle Icon start #####
  let handelIcon = () => {
    setIcon(!iCon);
  };
  // ############################### handle Icon end #####
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  border-t-0 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="  ">
              <img
                className="w-full  md:rounded-xl shadow-cyan-200 shadow-xl rounded-b-sm border-t-[1px] rounded-t-md opacity-50 "
                src="lost.png"
                alt="logo"
              />

              <p className="text-sm font-bold sm:pl-8 pl-6  text-gray-900  dark:text-white">
                Your Trusted Companion for Lost items
              </p>
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handelSubmit}
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {errorData.genErr ? (
                      <span className="text-red-400">{errorData.genErr}</span>
                    ) : (
                      <p>Your email</p>
                    )}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handleChk}
                  />
                </div>
                <div className="relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type={!iCon ? "password" : "text"}
                    name="pass"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChk}
                  />

                  {iCon ? (
                    <img
                      onClick={handelIcon}
                      className="w-4 h-4  absolute top-[40px] right-[20px] cursor-pointer"
                      src="eyeOp.svg"
                      alt="logo"
                    />
                  ) : (
                    <img
                      onClick={handelIcon}
                      className="w-4 h-4  absolute top-[40px] right-[20px] cursor-pointer"
                      src="eyeCl.svg"
                      alt="logo"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
              </form>
              <div className="flex justify-between">
                <button className="sm:px-2 px-[2px] sm:py-2 py-1 border flex gap-2 border-slate-200 rounded-lg text-white hover:border-slate-400 hover:text-red-600 hover:shadow transition duration-150">
                  <img
                    className="w-[20px] h-[20px]"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="text-[12px] sm:text-[14px]">
                    Login with Google
                  </span>
                </button>
                <button className="sm:px-2 px-[2px] sm:py-2 py-1 border flex gap-2 border-slate-200 rounded-lg text-white hover:border-slate-400 hover:text-red-600 hover:shadow transition duration-150">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2"
                    viewBox="0 0 1792 1792"
                  >
                    <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                  </svg>
                  <span className="text-[12px] sm:text-[14px]">
                    Sign in with GitHub
                  </span>
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Create New ?{" "}
                <a
                  href="/ "
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Registration
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
