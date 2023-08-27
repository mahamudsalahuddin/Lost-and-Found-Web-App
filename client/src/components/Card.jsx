import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ApplicationModal from "./ApplicationModal";

export const Card = (dat) => {
  const [slideUrl, setSlideUrl] = useState("");
  const [mesModal, setMesModal] = useState(false);
  const [mesModalClaimer, setModalClaimer] = useState(false);
  const [chatOpen, setChatOpen] = useState("kk");
  const [chatToClaimerOpen, setChattoClaimerOpen] = useState("kk");
  const [xOpen, setxOpen] = useState(false);
  const [buttonClaimer, setButtonClaimer] = useState("");
  const [claimer, setClaimer] = useState([]);
  const [postList, setPostList] = useState([]);
  const [update, setUpdate] = useState("");
  const [message, setMessagge] = useState("");
  const [conf, setConf] = useState(false);
  const [form, setForm] = useState(false);

  const [chat, setChat] = useState({
    chat: "",
  });

  let reduxReturnData = useSelector((state) => state);
  //#### slider start #####
  const picClick = (e) => {
    setSlideUrl(e.target.src);
  };

  //######## slide end #######

  //###### chat function start #####
  //####### send sms start axios ########
  const handelChat = (e) => {
    const { name, value } = e.target;

    setChat({ ...chat, [name]: value });
  };
  const handleSend = async (e) => {
    console.log("chatting", e);

    try {
      if (
        reduxReturnData.userStoreData.userInfo.email ===
        e.claimData.claimerEmail
      ) {
        await axios.post("http://localhost:5000/lostFound/messagepost", {
          postId: e.lostPst._id,
          reciverEmail: e.lostPst.email,

          senderEmail: reduxReturnData.userStoreData.userInfo.email,

          mess: chat.chat,
        });
        setTimeout(() => {
          const data = async () => {
            const how = await axios.get(
              "http://localhost:5000/lostFound/messageget"
            );

            if (how.data.length > 0) {
              setMessagge(how.data);
            }
          };
          data();
        }, 200);
      } else {
        await axios.post("http://localhost:5000/lostFound/messagepost", {
          postId: e.lostPst._id,
          reciverEmail: e.claimData.claimerEmail,

          senderEmail: e.lostPst.email,

          mess: chat.chat,
        });

        setTimeout(() => {
          const data = async () => {
            const how = await axios.get(
              "http://localhost:5000/lostFound/messageget"
            );

            if (how.data.length > 0) {
              setMessagge(how.data);
            }
          };
          data();
        }, 200);
      }
    } catch (err) {
      console.error("error:", err);
    }
  };

  useEffect(() => {
    const data = async () => {
      const how = await axios.get("http://localhost:5000/lostFound/messageget");

      if (how.data.length > 0) {
        setMessagge(how.data);
      }
    };
    data();
  }, []);

  const reFresh = async () => {
    const how = await axios.get("http://localhost:5000/lostFound/messageget");

    if (how.data.length > 0) {
      setMessagge(how.data);
    }
  };
  console.log("messageList:", message);
  //####### send sms start ########

  //###### chat function end #####
  //###### Message function start #####

  const chatToClaimerModal = (e) => {
    setChattoClaimerOpen(e.claimerEmail);
    console.log("chatBoxfor", e.claimerName);
    setxOpen(true);
  };
  const chatModal2 = (e) => {
    console.log("message to finder ", e);
    setChatOpen(e.finderName);
    setxOpen(true);
  };
  const chatModalClose = (e) => {
    console.log("closeChatMod", e);
    setChattoClaimerOpen("ljhhh");
    setxOpen(false);
  };
  useEffect(() => {
    const updateUser = async () => {
      try {
        const how = await axios.post(
          "http://localhost:5000/lostFound/userupdate",
          {
            email: dat.dat.email,
          }
        );
        setUpdate(how.data);
      } catch (err) {
        console.log(err);
      }
    };

    updateUser();
  }, []);
  console.log("userPicUpdate", update);
  //###### Message function end #####

  //###### Claimer function start #####

  const claimeRFun = async (e) => {
    console.log("lostPostinfo:", e);
    try {
      const how = await axios
        .post("http://localhost:5000/lostFound/claimerbuttonpost", {
          claimItemId: e._id,
        })
        .then((result) => {
          if (result.data.length > 0) {
            setButtonClaimer(result.data);
          }
        });
    } catch (err) {
      console.error("Error", err);
    }
    setModalClaimer(true);
  };

  console.log("buttonClaimer", buttonClaimer);
  const claimeTFun = async (e) => {
    console.log("iteminfo:", e);
    try {
      const how = await axios.post("http://localhost:5000/lostFound/claim", {
        claimerName: reduxReturnData.userStoreData.userInfo.displayName,
        claimerEmail: reduxReturnData.userStoreData.userInfo.email,

        claimerURL: reduxReturnData.userPic.proPic,
        claimItemId: e._id,
        category: e.category,
        subcat: e.subcat,
        finderName: e.name,
        fiderId: e.postlist_id,
        fiderURL: e.userImg,
        finderEmail:e.email
      });
    } catch (err) {
      console.log(err);
    }
    setMesModal(true);
  };

  useEffect(() => {
    const how = async () => {
      try {
        const low = await axios.get("http://localhost:5000/lostFound/claimbd");
        if (low.data.length > 0) {
          setClaimer(low.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    const getPostList = async () => {
      try {
        let how = await axios.post(
          "http://localhost:5000/lostFound/getallpostlist"
        );

        setPostList(how.data);
      } catch (err) {
        console.error("error", err);
      }
    };
    how();
    getPostList();
  }, []);
  console.log("claimer", claimer);
  console.log("allPostList", postList);

  //###### Claimer function end #####
  //########################### confirmFunction start####
  const confirmF = async (e) => {
    try {
      const low = await axios.post("http://localhost:5000/lostFound/confirm", {
        id: e._id,
        confirm: true,
      });
    } catch (err) {
      console.error("Error:", err);
    }

    setTimeout(() => {
      const post = async () => {
        const loww = await axios.post(
          "http://localhost:5000/lostFound/confrimdelete",
          {
            id: e.claimItemId,
          }
        );
      };
      post();
    }, 200);
  };

  const confirmDel = async (e) => {
    try {
      const low = await axios.post("http://localhost:5000/lostFound/confirm", {
        id: e._id,
        confirm: false,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // conformation form
  const formClaim = () => {
    setForm(true);
  };

  // delete and confirm

  useEffect(() => {
    const post = async () => {
      const loww = await axios.get(
        "http://localhost:5000/lostFound/confrimdelete",
        {}
      );

      setConf(loww.data);
    };
    post();
  });
  console.log("conf:", conf);
  //########################### confirmFunction end####
  return (
    <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-10 h-[500px] relative md:max-w-[850px] flex  ">
      <>
        <div className=" w-[50%]  dark:bg-gray-700 h-full">
          <div className="h-[400px] flex items-center justify-center">
            <img
              className="w-[330px] h-[350px] rounded-lg   shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ease-in-out duration-500 hover:scale-110  "
              src={slideUrl ?slideUrl:dat.dat.itImage[0] }
              alt="Product Image 1"
            />
          </div>

          <div className="w-full h-full border-t-2 rounded-lg ">
            <div className="  mt-[14px] mx-6 h-[180px] w-[95%] flex  flex-wrap">
              {dat.dat.itImage &&
                dat.dat.itImage.map((url, i) => (
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
                {dat.dat.category}
              </p>
            </div>
            <div className="w-[70%] border mt-1 border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
              <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                Sub-Category
              </h1>
              <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
                {dat.dat.subcat}
              </p>
            </div>
            <div className="w-[70%] border mt-1 border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
              <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                Location
              </h1>
              <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
                {dat.dat.location}
              </p>
            </div>
            <div className="w-[70%] border mt-1 border-gray-600 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
              <h1 className=" text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                Produc Detail
              </h1>
              <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
                {dat.dat.detail}
              </p>
            </div>
            <div className="w-[70%] border-1 mt-2 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
              <div className="flex items-center h-[80px] pl-4 space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={update ? update : "react.svg"}
                    alt="Bonnie image"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {dat.dat.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    "Hey I found this Product"
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[100%] border-1 mt-2 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
              <div className="flex items-center w-full justify-center h-[80px] pl-4 space-x-4 ">
                {dat.dat.email ===
                reduxReturnData.userStoreData.userInfo.email ? (
                  <button
                    onClick={() => claimeRFun(dat.dat)}
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[80%] py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    যারা দাবিদার
                  </button>
                ) : (
                  <button
                    onClick={() => claimeTFun(dat.dat)}
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[80%] py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    দাবি করুন
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>

      {mesModal && (
        <div className="block w-full absolute p-2 right-0  bg-white border overflow-y-auto h-full border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className=" text-xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white">
            Message
          </h3>

          <div className="relative">
            {claimer &&
              claimer.map(
                (info, k) =>
                  info.claimItemId === dat.dat._id &&
                  info.claimerName ===
                    reduxReturnData.userStoreData.userInfo.displayName &&
                  info.finderName !==
                    reduxReturnData.userStoreData.userInfo.displayName && (
                    <div key={k} className="relative ">
                      <div className="w-full ">
                        <div
                          onClick={() => chatModal2(info)}
                          className="w-[70%] border-1 mt-2 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] "
                        >
                          <div className="flex items-center h-[80px] pl-4 space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={info.fiderURL}
                                alt="Bonnie image"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {info.finderName}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                "Hey I find this {dat.dat.subcat}"
                              </p>
                            </div>
                          </div>

                          {chatOpen === info.finderName && (
                            <div key={k} className=" relative">
                              <div className="z-10 h-[200px] p-4 relative bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 overflow-y-scroll">
                                {message &&
                                  message.map((sms, i) => (
                                    <>
                                      {sms.postId === info.claimItemId &&
                                        reduxReturnData.userStoreData.userInfo
                                          .email === sms.senderEmail && (
                                          <>
                                            {sms.mess && (
                                              <div
                                                key={i}
                                                className=" mb-3 p-2 w-[70%] rounded-md translate-x-[150px] h-[50px] bg-blue-200"
                                              >
                                                {sms.mess}
                                              </div>
                                            )}
                                          </>
                                        )}

                                      {info.claimerEmail === sms.reciverEmail &&
                                        sms.postId === info.claimItemId &&
                                        reduxReturnData.userStoreData.userInfo
                                          .email !== sms.senderEmail && (
                                          <>
                                            {sms.mess && (
                                              <div
                                                key={i}
                                                className="mb-3 p-2 w-[70%] rounded-md h-[50px] bg-red-200"
                                              >
                                                {sms.mess}
                                              </div>
                                            )}
                                          </>
                                        )}
                                    </>
                                  ))}
                              </div>

                              <div className="w-full bg-zinc-600 h-[50px]  rounded-md p-1 mr-1">
                                <input
                                  onChange={handelChat}
                                  type="text"
                                  name="chat"
                                  className="w-full h-full rounded-lg pl-2 "
                                />
                                <button
                                  onClick={reFresh}
                                  className="  rounded-full  absolute z-30 right-0 "
                                >
                                  <img
                                    className="h-[40px] w-[40px] animate-spin ease-in-out hover:scale-110 duration-200 rounded-full"
                                    src="refresh.svg"
                                    alt="Bonnie image"
                                  />
                                </button>
                              </div>

                              <div className="flex justify-start">
                                <button
                                  onClick={() =>
                                    handleSend({
                                      claimData: info,
                                      lostPst: dat.dat,
                                    })
                                  }
                                  type=""
                                  className="w-[80%]   h-[30px]  border-t-2 text-blue-700 hover:text-white  border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
                                >
                                  Send{" "}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        {info.confirm && !form && (
                          <div
                            onClick={formClaim}
                            className="text-md shadow-2xl mt-4 text-center h-8 rounded-lg hover:scale-105 duration-300 cursor-pointer text-cyan-300 font-semibold w-[150px] bg-gray-600 "
                          >
                            Confirmation Form
                          </div>
                        )}
                      </div>

                      {form && <ApplicationModal data={info} />}
                      {xOpen && info.finderName && (
                        <button
                          onClick={() => (
                            setChatOpen(false),
                            setxOpen(false),
                            console.log(chatOpen)
                          )}
                          className="w-[105px] absolute right-[260px] z-30 bottom-[1px] h-[30px]  border-t-2 text-red-700 hover:text-white b border-red-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm  dark:border-blue-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
                        >
                          X
                        </button>
                      )}
                    </div>
                  )
              )}
          </div>

          <div className="w-[100%] border-1 mt-1 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <div className="flex items-center justify-end h-[40px] pl-1 space-x-4 ">
              <button
                onClick={() => (
                  setMesModal(false), setChatOpen(false), setxOpen(false)
                )}
                type="button"
                className="text-red-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {mesModalClaimer && (
        <div className="block w-full absolute p-2 right-0 bg-white border overflow-y-auto h-full border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h3 className=" text-xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white">
            Message
          </h3>

          <div className="">
            {buttonClaimer &&
              buttonClaimer.map(
                (info, k) =>
                  info.claimItemId === dat.dat._id &&
                  dat.dat.email ===
                    reduxReturnData.userStoreData.userInfo.email && (
                    <div key={k} className="relative ">
                      <div className="flex items-center">
                        <div
                          onClick={() => chatToClaimerModal(info)}
                          className="w-[70%] border-1 mt-2 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] "
                        >
                          <div className="flex hover:scale-90 duration-300 items-center h-[80px] pl-4 space-x-4">
                            <div className="flex-shrink-0">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={info.claimerURL}
                                alt="Bonnie image"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {info.claimerName}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                "Hey I claim this {dat.dat.category}"
                              </p>
                            </div>
                          </div>

                          {chatToClaimerOpen == info.claimerEmail && (
                            <div className=" relative">
                              <div className="z-10 h-[250px] p-4 relative bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 overflow-y-scroll">
                                {message &&
                                  message.map((sms, i) => (
                                    <>
                                      {info.claimerEmail == sms.reciverEmail &&
                                        reduxReturnData.userStoreData.userInfo
                                          .email !== sms.reciverEmail && (
                                          <>
                                            {sms.mess && (
                                              <div
                                                key={i}
                                                className=" mb-3 p-2 w-[60%] rounded-md translate-x-[150px] h-[50px] bg-blue-200"
                                              >
                                                {sms.mess}
                                              </div>
                                            )}
                                          </>
                                        )}

                                      {info.claimerEmail === sms.senderEmail &&
                                        reduxReturnData.userStoreData.userInfo
                                          .email === sms.reciverEmail && (
                                          <>
                                            {sms.mess && (
                                              <div
                                                key={i}
                                                className="mb-3 p-2 w-[60%] rounded-md h-[50px] bg-red-200"
                                              >
                                                {sms.mess}
                                              </div>
                                            )}
                                          </>
                                        )}
                                    </>
                                  ))}
                              </div>
                              <div className="w-full bg-zinc-600 h-[50px]  rounded-md p-1 mr-1">
                                <input
                                  onChange={handelChat}
                                  type="text"
                                  name="chat"
                                  className="w-full h-full rounded-lg pl-2 "
                                />
                              </div>

                              <div className="flex justify-start">
                                <button
                                  onClick={() =>
                                    handleSend({
                                      claimData: info,
                                      lostPst: dat.dat,
                                    })
                                  }
                                  type=""
                                  className="w-[80%]   h-[30px]  border-t-2 text-blue-700 hover:text-white  border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
                                >
                                  Send{" "}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        {!info.confirm && (
                          <button
                            onClick={() => confirmF(info)}
                            className="h-[80px] px-6 ml-4 hover:scale-90 duration-300 cursor-pointer  rounded-lg text-sm font-medium text-white bg-teal-600"
                          >
                            Confirm
                          </button>
                        )}

                        {info.confirm && (
                          <button
                            onClick={() => confirmDel(info)}
                            className="h-[80px] px-6 ml-4 hover:scale-90 duration-300 cursor-pointer  rounded-lg text-sm font-medium text-white bg-teal-600"
                          >
                            Delete
                          </button>
                        )}
                      </div>{" "}
                      <>
                        {xOpen && chatToClaimerOpen == info.claimerEmail && (
                          <button
                            onClick={() => chatModalClose(info)}
                            className="w-[105px] absolute right-[232px] z-30 bottom-[1px] h-[30px]  border-t-2 text-red-700 hover:text-white b border-red-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium  text-sm  text-center roundes-sm  dark:border-blue-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "
                          >
                            X
                          </button>
                        )}
                      </>
                    </div>
                  )
              )}
          </div>

          <div className="w-[100%] border-1 mt-1 rounded-md p-[2px] shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] ">
            <div className="flex items-center justify-end h-[40px] pl-1 space-x-4 ">
              <button
                onClick={() => (
                  setModalClaimer(false),
                  setChattoClaimerOpen(false),
                  setxOpen(false)
                )}
                type="button"
                className="text-red-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 dark:border-blue-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
