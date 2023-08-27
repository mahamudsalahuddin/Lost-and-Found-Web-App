import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

import { activePic } from "../slice/picSlice";
import { activeUser } from "../slice/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Card from "../components/Card";
import Cardx from "../components/Cardx";
import MessReadModal from "../components/MessReadModal";
import Donate from "../components/Donate";

const User = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let reduxReturnData = useSelector((state) => state);

  let [data, setData] = useState({
    email: reduxReturnData.userStoreData.userInfo.email,
    category: "",
    subcat: "",
    detail: "",
    location: "",
    itImage: "",
    postlist_id: "",
    name: "",
    userImg: reduxReturnData.userPic.proPic,
  });
  let [errorData, setError] = useState({
    category: "",
    subcat: "",
    detail: "",
    location: "",
    itImage: "",
  });
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedImageUser, setSelectedImageUser] = useState(null);
  let [userModal, setUserModal] = useState(false);
  let [itemModal, setItemModal] = useState(false);
  const [url, setUrl] = useState([]);
  const [u, setU] = useState([]);
  const [userImg, setUserImg] = useState("");
  const [myPostCard, setMyPostCard] = useState(false);
  const [trans, setTrans] = useState("");
  const [myClaim, setMyClaim] = useState([]);

  const [postList, setPostList] = useState([]);
  const [getApply, setGetApply] = useState([]);
  const [apforreceive, setApforreceive] = useState([]);
  const [apforreceiveShow, setApforreceiveShow] = useState(false);

  //##### Page Navigate Start ####

  useEffect(() => {
    if (reduxReturnData.userStoreData.userInfo == null) {
      navigate("/login");
    }
  }, []);

  //##### Page Navigate End ####

  //####### user Image upload start###
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChangeItem = async (event) => {
    const files = event.target.files;
    const base64s = [];
    if (files.length >= 1) {
      for (var i = 0; i < files.length; i++) {
        var base = await convertBase64(files[i]);
        base64s.push(base);
      }
    }
    setSelectedImage(base64s);
  };

  const handleImageChangeUser = async (event) => {
    const files = event.target.files;
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      setSelectedImageUser(base64);
    } else {
      setError({ ...errorData, itImage: "Failed" });
    }
  };
  //####### user Image upload end###
  //###################### Loader  refresh start#####
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    // Perform operation and then set loading to false

    await axios
      .post("http://localhost:5000/lostFound/getItImg", {
        email: reduxReturnData.userStoreData.userInfo.email,
      })
      .then((res) => {
        setUrl(res.data[0].itImage);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  //###################### Loader  end#####
  //####### get inputData start ###########
  let getInput = (e) => {
    let { name, value } = e.target;

    setData({ ...data, [name]: value });
    setError({ ...errorData, [name]: "" });
    console.log(data);
  };
  //####### get inputData end ###########

  //####### submit start ###########
  let subMit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/lostFound/itemupload", {
        email: data.email,
        category: data.category,
        subcat: data.subcat,
        detail: data.detail,
        location: data.location,
        itImage: data.itImage,
        postlist_id: data.postlist_id,
        userImg: data.userImg,
        name: data.name,
      })
      .then((res) => {
        console.log(res);
        setData("");
        setUrl([])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //####### submit end ###########
  //####### Modal submit start ###########
  let userModalHide = async () => {
    console.log(selectedImageUser);
    await axios
      .post("http://localhost:5000/lostFound/profile", {
        email: reduxReturnData.userStoreData.userInfo.email,
        userImg: selectedImageUser,
      })
      .then((res) => {
        localStorage.setItem("proPic", JSON.stringify(res.data.secure_url));
        dispatch(activePic({ pic: res.data.secure_url })).catch((err) => {
          console.log(err);
        });
        setUserImg(userImg);
        console.log(res);
        setUserModal(false);
      })
      .catch((err) => {
        console.log(err.data);
        setUserModal(false);
      });
  };
  let userModalShow = () => {
    setUserModal(true);
  };
  //#######################item img send #######
  let itemModalShow = () => {
    setItemModal(!itemModal);
  };
  let itemModalHide = async () => {
    await axios
      .post("http://localhost:5000/lostFound/itemImg", {
        email: reduxReturnData.userStoreData.userInfo.email,
        itImage: selectedImage,
      })
      .then((res) => {
        setU(res);
        setItemModal(false);
      })
      .catch((err) => {
        console.log(err);
        setItemModal(false);
      });
  };

  //#######Modal submit end ###########

  //####### fetch data useffect start ###########

  //####### fetch data useffect start ###########
  useEffect(() => {
    const getData = async () => {
      try {
        let how = await axios.post("http://localhost:5000/lostFound/userImg", {
          email: reduxReturnData.userStoreData.userInfo.email,
        });
        setUserImg(how.data[0].userImg);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getPostList = async () => {
      try {
        let how = await axios.post(
          "http://localhost:5000/lostFound/getpostlist",
          {
            email: reduxReturnData.userStoreData.userInfo.email,
          }
        );
        if (how.data.length > 0) {
          setPostList(how.data);
        } else {
          setPostList("");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPostList();
  }, []);

  const logOn = (data) => {
    setTrans(data);
    setMyPostCard(true);
  };

  //### my Claim
  useEffect(() => {
    const myCalimList = async () => {
      const how = await axios.post(
        "http://localhost:5000/lostFound/claimpost",
        {
          email: reduxReturnData.userStoreData.userInfo.email,
        }
      );

      setMyClaim(how.data);
    };
    myCalimList();
  }, []);
  console.log("myClaim", myClaim);

  //apply data
  useEffect(() => {
    const appLy = async () => {
      const low = await axios.get("http://localhost:5000/lostFound/applyget");
      console.log(low.data);
      if (low.data.length > 0) {
        setGetApply(low.data);
      }
    };
    appLy();
  }, []);
  //#################### fetch data useffect end ####

  //######### approve for receive start ####
  const aplyShow = async (e) => {
    const low = await axios.post(
      "http://localhost:5000/lostFound/apforreceive",
      {
        id: e,
      }
    );
    if (low.data.length === 1) {
      setApforreceiveShow(true);
      setApforreceive(low.data);
    }
  };
  console.log(apforreceive);
  //######### approve for receive end ####
  //##### history fetch start ####
  const [histo, setHisto] = useState("");
  useEffect(() => {
    const getHis = async () => {
      const how = await axios.get("http://localhost:5000/lostFound/histoget");
      console.log(how.data);
      if (!how.data.error) {
        setHisto(how.data);
      }
    };
    getHis();
  }, []);
  console.log("histo:", histo);
  //##### history fetch end ####

  // bar for responsive#####
  let [menu, setMenu] = useState(false);
  let [side, setSide] = useState(false);
  
  let [open, setOpen] = useState(false);
  let [mess, setMess] = useState(false);
  let [info, setInfo] = useState("");
  let [dot, setDot] = useState(false);
  let [post, setPost] = useState(false);
  let [dat, setDat] = useState("");

  const menuOpen = () => {
    setMenu(!menu);
    setPost(false);
    setOpen(false)
    
  };

  const messOpen = () => {
    setOpen(!open);
    setPost(false)
    setMess(false);
    setDot(false)

  };
  
  const menuBar =()=>{
    
  }
  const donateFn = () => {
    setDot(!dot);
    setPost(false)
    setMess(false);
    setOpen(false)
  }
  const handleRead = (e) => {
    setMess(e._id);
    setDat(e);
    console.log(e);
  };
  const handlePost = () => {
    setPost(!post);
    setUrl([])
    setOpen(false)
    setDot(false);
  
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

 ;

  let logOut = () => {
    localStorage.removeItem("userInfo");
    dispatch(activeUser(null));
    console.log("Sing Out from:", window.location.pathname.split("/")[1]);
    navigate("/login");
  };
  return (
    <>
      <div className="w-full  dark:bg-gray-600 ">
        <Navbar   menuOpen={menuOpen} />

        <div className=" flex justify-between relative ">
        
          {menu && (
            <div onClick={menuBar} className=" p-2 w-[180px] h-[600px] block md:hidden  bg-white border  border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700  ">

            {userModal && (
             
                <div className=" fixed z-20 top-[148px]">
                  <div className="mb-[10px]   rounded-md border-b-0 bg-green-400  text-sm max-w-[140px] overflow-x-hidden">
                    <input
                    className="text-sm"
                      placeholder="User image "
                      name="userImg" 
                      type="file"
                      accept="image/*"
                      onChange={handleImageChangeUser}
                    />
                  </div>
                  <div
                    onClick={userModalHide}
                    className="text-center w-full text-sm font-sans border border-gray-600 rounded-md bg-slate-800 shadow-2xl hover:bg-orange-950 cursor-pointer  font-semibold text-cyan-300 absolute bottom-[-10px] "
                  >
                    Upload
                  </div>
                </div>
              
            )}
            <div className="flex flex-col  items-center pt-1 relative ">
              <div className="">
                <img
                  onClick={()=>setUserModal(!userModal)}
                  // className="w-24 h-24 mb-3 rounded-full  shadow-2xl cursor-pointer "
                  className="flex-shrink-0 object-cover border-[2px] border-gray-600 object-center  flex w-16 h-16 mr-auto mb-1 ml-auto rounded-full   shadow-xl"
                  src={userImg ? userImg : "react.svg"}
                  alt="lost & found"
                />
              </div>

              <h5 className="mb-[] text-base font-medium text-gray-900 dark:text-white">
                {reduxReturnData.userStoreData.userInfo.displayName}
              </h5>
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-4">
                {reduxReturnData.userStoreData.userInfo.email}
              </span>
            </div>

            <div className=" w-[140px] mb-[20px] flex gap-x-6 justify-center ">
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
              <button
                onClick={ handlePost}
                className="w-[140px] px-1.5 py-[2px] mb-4 rounded-md border-[#2196F3]  border-2 hover:animate-pulse "
              >
                <p className="text-md font-serif font-bold text-[#4795EA]">
                  Lost Item Post
                </p>
              </button>
           
              <div
                onClick={messOpen}
                className="relative mt-4 cursor-pointer "
              >
                {" "}
                {info.length > 0 && (
                  <span className=" absolute left-[12px] top-[12px] w-[25px] rounded-md h-[25px] opacity-75 bg-cyan-400 animate-ping scale-105 duration-300 ease-in"></span>
                )}
                <img
                  className="w-[50px] h-[50px] hover:scale-105 duration-500"
                  src="mess.png"
                />
              </div>

              <button
                onClick={donateFn}
                className="w-[140px] px-1.5 py-[2px] my-4 rounded-md border-[#2196F3] bg-gradient-to-br  bg-pink-900 border-2 hover:animate-pulse "
              >
                <p className="text-md font-serif font-bold text-[#4795EA]">
                  Donate 
                </p>
              </button>

              <button
                type="button"
                onClick={logOut}
                className="inline-block mt-6 rounded-full bg-danger px-5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-800 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
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
          )}



          <div className="w-[30%] h-full hidden md:block max-w-sm bg-white border  border-gray-200  shadow dark:bg-gray-800 dark:border-gray-700 relative ">
            {userModal && (
              <div className=" w-full   md:px-12 lg:px-20 absolute z-20 top-[90px] shadow-2xl   border-gray-700 border rounded-full">
                <div className="grid grid-cols-1 relative">
                  <div className="mt-4  mb-3 ml-auto rounded-sm bg-green-400  text-sm max-w-[181px]">
                    <input
                      placeholder="User image "
                      name="userImg"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChangeUser}
                    />
                  </div>
                  <div
                    onClick={userModalHide}
                    className="text-center ml-[10px] w-full text-sm font-sans border border-gray-600 rounded-full bg-slate-800 shadow-2xl hover:bg-orange-950 cursor-pointer  font-semibold text-cyan-300 absolute bottom-[-10px]"
                  >
                    Upload
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col  items-center pt-8 relative ">
              <div className="">
                <img
                 onClick={()=>setUserModal(!userModal)}
                  // className="w-24 h-24 mb-3 rounded-full  shadow-2xl cursor-pointer "
                  className="flex-shrink-0 object-cover border-[2px] border-gray-600 object-center  flex w-16 h-16 mr-auto mb-1 ml-auto rounded-full   shadow-xl"
                  src={userImg ? userImg : "react.svg"}
                  alt="lost & found"
                />
              </div>

              <h5 className="mb-[2px] text-xl font-medium text-gray-900 dark:text-white">
                {reduxReturnData.userStoreData.userInfo.displayName}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {reduxReturnData.userStoreData.userInfo.email}
              </span>
            </div>
            <div className="mx-4 mt-4 shadow-gray-600  border-gray-500 rounded-md p-1 shadow-2xl relative ">
              <h5 className="mb-4 text-md font-medium text-gray-900 dark:text-cyan-500">
                Lost Item Upload
              </h5>
              <form onSubmit={subMit} action="#">
                <label className="block  text-sm font-medium text-gray-900 dark:text-gray-400">
                  Category
                </label>
                <select
                  onChange={getInput}
                  name="category"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a category</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Document">Document</option>
                  <option value="Human">Human</option>
                </select>
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Sub-category
                </label>
                <input
                  onChange={getInput}
                  name="subcat"
                  type="text"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Product Details
                </label>
                <input
                  onChange={getInput}
                  name="detail"
                  type="text"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Location
                </label>
                <input
                  onChange={getInput}
                  name="location"
                  type="text"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className=" mt-2 h-[240px]"></div>

                <div>
                  <button
                    type="submit"
                    className="w-full  text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <button
                className={`bg-cyan-500 rounded-full hover:bg-purple-700 text-white absolute top-[292px] right-[2px] py-2 px-2  ${
                  loading ? "cursor-not-allowed opacity-25" : ""
                }`}
                onClick={handleClick}
                disabled={loading}
              >
                <img className="w-2 h-2 " src="ref.svg" />
              </button>
              <div className="mt-2 h-[240px top-[280px] absolute ">
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Upload Image
                </label>
                <svg
                  onClick={itemModalShow}
                  className="h-6 w-6 text-gray-400 mx-[25px] top-[70px] left-2 cursor-pointer "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />{" "}
                  <circle cx="12" cy="13" r="4" />
                </svg>

                <div className="flex gap flex-wrap  mt-2 mx-2 h-[180px] w-[95%]">
                  {url.map((pic, i) => (
                    <img
                      key={i}
                      className=" h-[85px] w-[120px] rounded-md  mx-[5px] "
                      src={pic}
                      alt={i}
                    />
                  ))}
                </div>

                {itemModal && (
                  <div className="items-center w-full mr-auto ml-auto  max-w-7xl md:px-12 lg:px-18 absolute  top-[50px] z-20 shadow-2xl   rounded-full">
                    <div className="grid grid-cols-1 relative">
                      <div className="mt-4 mr-auto mb-4 ml-auto rounded-sm bg-green-400  text-sm max-w-[181px]">
                        <input
                          multiple
                          placeholder="User image "
                          name="itImage"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChangeItem}
                        />
                      </div>
                      <div
                        onClick={itemModalHide}
                        className="text-center text-sm font-sans border border-gray-600 rounded-full bg-slate-800 shadow-2xl hover:bg-orange-950 cursor-pointer  font-semibold text-cyan-300 absolute bottom-[-10px] left-[40%]"
                      >
                        Upload
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="w-full hidden md:flex md:block  ">
            <div className="w-[70%] relative p-4">
              <div className="w-[700px] mt-10  border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  My Post Item
                </h5>
                <ul className="flex gap-x-4 flex-wrap">
                  {postList &&
                    postList.map((data, i) => (
                      <li
                        key={i}
                        // onClick={(item) => (setMyPostCard(true),console.log(item))}
                        onClick={() => logOn(data)}
                        className="rounded-md hover:scale-110 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                      >
                        {" "}
                        <div className=" items-center flex h-[80px] pl-1 space-x-2">
                          <div key={u} className="flex-shrink-0">
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
                        </div>{" "}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="w-[700px] mt-14 border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Delivered to owner
                </h5>
                <ul className="flex gap-x-4 flex-wrap">
                  {histo &&
                    histo.map((his, s) => (
                      <li
                        key={s}
                        className="rounded-md hover:scale-110 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                      >
                        <div className=" items-center flex h-[80px] pl-1 space-x-2">
                          {reduxReturnData.userStoreData.userInfo.email ===
                            his.finderEmail && (
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
                                <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                                  Comment: "{his.mess} "
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="w-[700px] mt-14 border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Approve for receive / অপেক্ষমান{" "}
                </h5>

                <ul className="flex gap-x-4 flex-wrap">
                  {getApply &&
                    getApply.map((ap, i) => (
                      <>
                        {ap.claimerEmail ===
                          reduxReturnData.userStoreData.userInfo.email && (
                          <li
                            key={i}
                            className="rounded-md hover:scale-110 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                          >
                            {""}
                            <div className=" items-center flex h-[80px] pl-1 space-x-2">
                              <div className="flex-shrink-0  shadow-2x">
                                <img
                                  className="w-12 h-12 rounded-full "
                                  src="react.svg"
                                  alt="Bonnie image"
                                />
                              </div>
                              <div className="flex-1 min-w-0 relative ">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {ap.category}{" "}
                                </p>
                                <p className="text-sm text-cyan-500 truncate dark:text-cyan-400">
                                  "{ap.subcat}"
                                </p>
                                <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                                  Finder: "{ap.finderName}"
                                </p>
                                <p className="text-[10px] absolute top-0 right-1 text-cyan-500 truncate dark:text-cyan-400">
                                  Status:{" "}
                                  <span className="text-sky-200 font-bold">
                                    {ap.confirm}
                                  </span>
                                </p>
                                <p
                                  onClick={() => aplyShow(ap.itemId)}
                                  className="text-[14px] cursor-pointer text-cyan-500 truncate dark:text-cyan-400"
                                >
                                  Id: {JSON.stringify(ap.itemId).slice(-9)}
                                </p>
                                {ap.opt && (
                                  <>
                                    {" "}
                                    <span className="animate-ping top-0 right-0 absolute inline-flex h-[10px] w-[10px]  rounded-full bg-sky-400 opacity-75"></span>
                                    <span className=" top-0 right-0 absolute inline-flex h-[10px] w-[10px]  rounded-full bg-sky-500 opacity-75"></span>{" "}
                                  </>
                                )}
                              </div>
                            </div>
                          </li>
                        )}
                      </>
                    ))}
                </ul>
              </div>

              <div className="w-[700px] h-[140px] mt-14 border border-gray-600 rounded-md p-[4px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
                <>
                  <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    Approve for delivery / অপেক্ষমান{" "}
                  </h5>

                  <ul className="flex gap-x-4 flex-wrap">
                    {getApply &&
                      getApply.map((ap, i) => (
                        <>
                          {ap.finderEmail ===
                            reduxReturnData.userStoreData.userInfo.email && (
                            <li
                              key={i}
                              className="rounded-md hover:scale-105 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                            >
                              {" "}
                              <div className=" items-center flex h-[100px] pl-1 space-x-2">
                                <div className="flex-shrink-0">
                                  <img
                                    className="w-12 h-12 rounded-sm"
                                    src="react.svg"
                                    alt="Bonnie image"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {ap.category}
                                  </p>
                                  <p className="text-sm text-cyan-500 truncate dark:text-cyan-400">
                                    "{ap.subcat}"
                                  </p>
                                  <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                                    Claimer: "{ap.claimerName}"
                                  </p>
                                  <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                                    Status:{" "}
                                    <span className="text-sky-200">
                                      {ap.confirm}
                                    </span>
                                  </p>
                                  <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                                    Id:{" "}
                                    <span className="text-sky-200">
                                      {" "}
                                      {JSON.stringify(ap.itemId).slice(-9)}
                                    </span>
                                  </p>
                                </div>
                              </div>{" "}
                            </li>
                          )}
                        </>
                      ))}
                  </ul>
                </>
              </div>

              {apforreceiveShow && (
                <div className="translate-y-[-337px]  translate-x-[-12px]">
                  <Cardx dat={apforreceive} />

                  <div
                    onClick={() => setApforreceiveShow(false)}
                    className="w-[14px]  rounded-full absolute top-1 right-[1px] flex justify-center items-center  h-[98%]  text-red-700 hover:text-white  hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm   dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-800 "
                  >
                    X
                  </div>
                </div>
              )}
              {myPostCard && (
                <div className="fixed top-[50px] right-[200px] w-[800px]">
                  <Card dat={trans} />

                  <div
                    onClick={() => setMyPostCard(false)}
                    className="w-[14px]  rounded-full absolute top-[42px] right-[1px] flex justify-center items-center  h-[92%]  text-red-700 hover:text-white  hover:bg-red-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm   dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-800 "
                  >
                    X
                  </div>
                </div>
              )}
            </div>
            <div className="w-[28%] p-4">
              <div className="w-[220px] mt-10  border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
                <h5 className=" text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  My Claim
                </h5>
                <ul className="flex gap-x-4 flex-wrap">
                  {myClaim &&
                    myClaim.map((data, i) => (
                      <li
                        key={i}
                        // onClick={(item) => (setMyPostCard(true),console.log(item))}
                        onClick={() => logOn(data)}
                        className="rounded-md hover:scale-110 ease-in duration-100 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                      >
                        {" "}
                        <div className=" items-center flex h-[80px] pl-1 space-x-2">
                          <div key={u} className="flex-shrink-0">
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
                      </li>
                    ))}
                </ul>
              </div>

              <div className="w-[220px] mt-4 border border-gray-600 rounded-md p-[6px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
                <h5 className=" text-md mb-2 text-center font-bold tracking-tight text-gray-900 dark:text-white">
                  আমি খুঁজে পেয়েছি
                </h5>
                <ul className="flex  flex-wrap">
                  {histo &&
                    histo.map((his, s) => (
                      <li
                        key={s}
                        className="rounded-md w-[95%] hover:scale-110 ease-in duration-300 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]  "
                      >
                        {reduxReturnData.userStoreData.userInfo.email ===
                          his.claimerEmail && (
                          <>
                            <div className=" items-start justify-center mt-2 flex  pl-1 space-x-2">
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
                              </div>
                            </div>{" "}
                            <div className="pl-[2px]">
                              <p className="text-[14px] text-cyan-500 truncate dark:text-cyan-400">
                                Finder: "{his.finderName}"
                              </p>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div onClick={()=>setUserModal(false)} className="w-full md:hidden md:flex block relative ">
            fhfhfghg

            { post && <div className="w-full z-20 top-[0] bg-gray-600 md:hidden md:flex block absolute">
            
            <div className=" shadow-gray-600   border-gray-500 rounded-md p-1 shadow-2xl  ">
              <h5 className="mb-4 text-md font-medium text-gray-900 dark:text-cyan-500">
                Lost Item Upload ami
              </h5>
              <form onSubmit={subMit} action="#">
                <label className="block  text-sm font-medium text-gray-900 dark:text-gray-400">
                  Category
                </label>
                <select
                  onChange={getInput}
                  name="category"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a category</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Document">Document</option>
                  <option value="Human">Human</option>
                </select>
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Sub-category
                </label>
                <input
                  onChange={getInput}
                  name="subcat"
                  type="text"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Product Details
                </label>
                <input
                  onChange={getInput}
                  name="detail"
                  type="text"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Location
                </label>
                <input
                  onChange={getInput}
                  name="location"
                  type="text"
                  className=" text-gray-900 text-sm  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className=" mt-2 h-[240px]"></div>

                <div>
                  <button
                    type="submit"
                    className="w-full  text-white bg-cyan-500 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-primary-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <button
                className={`bg-cyan-500 rounded-full hover:bg-purple-700 text-white absolute top-[296px] right-[2px] py-2 px-2  ${
                  loading ? "cursor-not-allowed opacity-25" : ""
                }`}
                onClick={handleClick}
                disabled={loading}
              >
                <img className="w-2 h-2 " src="ref.svg" />
              </button>
              <div className="mt-2 h-[240px top-[280px] absolute ">
                <label className="block mt-[2px] text-sm font-medium text-gray-900 dark:text-gray-400">
                  Upload Image
                </label>
                <svg
                  onClick={itemModalShow}
                  className="h-6 w-6 text-gray-400 mx-[25px] top-[70px] left-2 cursor-pointer "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />{" "}
                  <circle cx="12" cy="13" r="4" />
                </svg>

                <div className="flex gap flex-wrap  mt-2 mx-2 h-[180px] ">
                  {url && url.map((pic, i) => (
                    <img
                      key={i}
                      className="min-[660px]:h-[85px]   min-[660px]:w-[120px] max-[450px]:w-[80px] max-[450px]:h-[88px] rounded-md max-[450px]:mx-[2px] mx-[2px]  "
                      src={pic}
                      alt={i}
                    />
                  ))}
                </div>

                {itemModal && (
                  
   <div className=" fixed z-20 top-[148px] max-[450px]:top-[415px]">
   <div className="mb-[10px]   rounded-md border-b-0 bg-green-400  text-sm max-w-[140px] overflow-x-hidden">
     <input
     className="text-sm"
       placeholder="User image "
       name="userImg" 
       type="file"
       accept="image/*"
       onChange={handleImageChangeItem}
     />
   </div>
   <div
     onClick={itemModalHide}
     className="text-center w-full text-sm font-sans border border-gray-600 rounded-md bg-slate-800 shadow-2xl hover:bg-orange-950 cursor-pointer  font-semibold text-cyan-300 absolute bottom-[-10px] "
   >
     Upload
   </div>
 </div>

                )}
              </div>
            </div>
            
            </div>}

  
     {open && (
        <div className=" rounded-md z-20 flex  left-[0px] top-1 w-[100px]  items-center absolute   ">
          <ul className="flex flex-col bg-gray-300 rounded-md  p-2">
            {info &&
              info.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleRead(item)}
                  className="border-gray-400 flex flex-row mb-2"
                >
                  <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-2  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4">
                      new
                    </div>
                    <div className="flex-1  mr-10">
                      <div className="font-bold text-sm">{item.category}</div>
                      <div className="text-gray-600 font-bold text-[10px]">{item.subcat}</div>
                    </div>
                    <div className="text-gray-600 text-[8px]">
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
        <div className="w-full fixed translate-x-[-140px] sm:translate-x-[200px] sm:translate-y-[-18px]  translate-y-[100px] ">
          {" "}
          <MessReadModal  dat={dat} />{" "}
        </div>
      )}


{dot && <div className="absolute right-[15px] "> <Donate/></div>}
          </div>


         
  
        </div>


      </div>
    </>
  );
};

export default User;
