import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const Donate = () => {
  let [seletAmo, setSelectAmo] = useState("");
  let [other, setOther] = useState(false);
  let [show, setShow] = useState(false);
  let [modal, setModal] = useState(false);
  let [bank, setBank] = useState("");
  let [donate, setDonate] = useState({
    amount: "",
    fre: "",
    paymethod: "",
  });
  let [kdonate, setKdonate] = useState("");
  let reduxReturnData = useSelector((state) => state);
  let navigate = useNavigate();
  const pamentSub = (e) => {
    e.preventDefault();
    setKdonate(donate);
    setDonate(" ");
    setShow(true);
  };
  console.log("donation:", kdonate);
  const selectAmount = (e) => {
    setSelectAmo(e.target.value);
  };

  // getInput vakue #####
  const donateIn = (e) => {
    const { name, value } = e.target;

    setDonate({ ...donate, amount: seletAmo, [name]: value });
  };
  // ### bank payment ####
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const submitBank = (e) => {
    e.preventDefault();

    setBank(state);
    setState({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      focus: "",
    });
    setModal(true);
    setTimeout(()=>{
        navigate("/user")

    },3000)
  };
  console.log(bank);
  //##########
  return (
    <div className='lg:fixed  lg:p-6 p-2 z-30 w-full   h-full bg-[url("dali.png")] lg:flex justify-center '>
      <div className="w-[60px] h-[60px] absolute top-0 right-[31%] rounded-full bg-cyan-800 duration-300 animate-pulse opacity-20"></div>
      <div className="lg:w-[400px] w-full  lg:h-[460px]  bg-[#F7F7F9] shadow-2xl rounded-md ">
        <div className=" mb-2 h-[120px] border-b bg-[#faf9fb] shadow-2xl rounded-md p-4 flex justify-between ">
          <div className="w-[60%]">
            {" "}
            <p className="text-gray-800 font-serif text-[16px] font-bold  ">
              Thanks for supporting
            </p>{" "}
            <p className="text-gray-800 font-serif text-[16px] font-bold  ">
              our work
            </p>{" "}
          </div>
          <div className="w-[40%] ">
            <div className="pr-6 rounded-md border hover:bg-[#F7D7F9] duration-300 ease-out h-full shadow-xl">
              <p className="text-gray-800 font-sans text-[16px] font-semibold text-end ">
                Your donation
              </p>
              <p className="text-gray-800 font-sans text-[14px] font-semibold text-end ">
                $ {donate.other ? donate.other : seletAmo} tk
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-800 font-serif text-[14px] font-bold  ">
            Select doantion amount
          </p>
          <div className="flex gap-x-4">
            <button
              onClick={(e) => (selectAmount(e), setOther(false))}
              value={"50"}
              className="rounded-md border border-gray-600  px-1.5 py-1 text-base font-medium text-gray-800 transition duration-200 active:bg-cyan-200"
            >
              50tk
            </button>
            <button
              onClick={(e) => (selectAmount(e), setOther(false))}
              value={"100"}
              className="rounded-md border border-gray-600  px-1.5 py-1 text-base font-medium text-gray-800 transition duration-200 active:bg-cyan-200"
            >
              100tk
            </button>
            <button
              onClick={(e) => (selectAmount(e), setOther(false))}
              value={"500"}
              className="rounded-md border border-gray-600 px-1.5 py-1 text-base font-medium text-gray-800 transition duration-200 active:bg-cyan-200"
            >
              500tk
            </button>
            <button
              onClick={(e) => (selectAmount(e), setOther(!other))}
              value={donate.other}
              className="rounded-md border border-gray-600 px-1.5 py-1 text-base font-medium text-gray-800 transition duration-200 active:bg-cyan-200"
            >
              other
            </button>
          </div>
          {other && (
            <>
              <p className="text-gray-800 font-serif text-[14px] font-bold mt-2  ">
                Other amount
              </p>
              <input
                onChange={donateIn}
                type="number"
                name="other"
                className="rounded -md w-[300px] h-[30px] border border-gray-300 pl-4 shadow-md "
              />
            </>
          )}
          <p className="text-gray-800 font-serif text-[14px] font-bold mt-2  ">
            Frequency
          </p>
          <select
            name="fre"
            onChange={donateIn}
            className="rounded -md w-[300px] h-[30px] border font-serif text-[14px] font-semibold border-gray-300 pl-4 shadow-md "
          >
            <option selected></option>
            <option value="One time">One time</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
          <p className="text-gray-800 font-serif text-[14px] font-bold mt-2  ">
            Payment method
          </p>
          <select
            name="paymethod"
            onChange={donateIn}
            className="rounded -md w-[300px] h-[30px] border font-serif text-[14px] font-semibold border-gray-300 pl-4 shadow-md "
          >
            <option selected></option>
            <option value="Bank">Bank</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
          </select>

          <button
            type="submit"
            onClick={pamentSub}
            className="block mt-4 w-[300px] bg-cyan-400 rounded-md border border-gray-600 px-1.5 py-3 text-base font-medium text-gray-800 transition duration-200 active:bg-cyan-200"
          >
            Next
          </button>
        </div>
      </div>
      {show && kdonate.paymethod === "Bkash" && (
        <div className="fixed w-[400px] h-[460px]  bg-[#F7F7F9] shadow-2xl rounded-md ">
          <img className="" src="bk.png" />
          <img
            className="absolute top-[120px] rounded-full left-[155px]"
            src="bar.png"
          />

          <div className=" w-full">
            <p className="text-sans text-[14px] font-bold text-center">
              Amount: {kdonate.amount ? kdonate.amount : kdonate.other}{" "}
              <span className="text-[12px]">tk</span>
            </p>
          </div>
        </div>
      )}
      {show && kdonate.paymethod === "Bank" && (
        <div className="fixed w-[400px] p-6 h-[480px]  bg-[#F7F7F9] shadow-2xl rounded-md">
          <div>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <div>
              <div className="flex justify-between items-center my-4">
                <div className="text-md text-sans font-semibold">
                  Card Number
                </div>
                <input
                  type="number"
                  name="number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-48 py-1 px-2 border border-gray-300 rounded"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-md text-sans font-semibold">
                  Cardholder Name
                </div>
                <input
                  type="text"
                  name="name"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-48 py-1 px-2 border border-gray-300 rounded"
                  placeholder={
                    reduxReturnData.userStoreData.userInfo.displayName
                  }
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-md text-sans font-semibold">
                  Expiration Date
                </div>
                <input
                  type="number"
                  name="expiry"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-[80px] p-1  border border-gray-300 rounded"
                  placeholder="MM/YY"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-md text-sans font-semibold">CVV</div>
                <input
                  type="number"
                  name="cvc"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-16 py-1 px-4 border border-gray-300 rounded"
                  placeholder="123"
                />
              </div>
              <button
                className="w-full h-[40px] bg-cyan-400 rounded-md font-semibold  font-sans"
                onClick={submitBank}
              >
                Submit
              </button>
            </div>
            <p className="text-sans text-[14px] font-bold text-center">
              Amount: {kdonate.amount ? kdonate.amount : kdonate.other}{" "}
              <span className="text-[12px]">tk</span>
            </p>
          </div>
        </div>
      )}
      {show && kdonate.paymethod === "Rocket" && (
        <div className="fixed w-[400px] h-[460px]  bg-[#F7F7F9] shadow-2xl rounded-md">
          <img className="rounded-md" src="roc.svg" />
          <img className=" rounded-full ml-[130px]" src="bar.png" />

          <div className=" w-full">
            <p className="text-sans text-[14px] font-bold text-center">
              Amount: {kdonate.amount ? kdonate.amount : kdonate.other}{" "}
              <span className="text-[12px]">tk</span>
            </p>
          </div>
        </div>
      )}

      {modal && (
        <div className="flex justify-center items-end text-center min-h-screen sm:block absolute">
          <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          <div
            className="inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform
        shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
          >
            <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
              <div className="grid grid-cols-1">
                <div className="mt-4 mr-auto mb-4 ml-auto rounded-full bg-green-400 max-w-lg">
                  <img
                    src="suc.svg"
                    className="flex-shrink-0 object-cover object-center btn- flex w-20 h-20 mr-auto  ml-auto rounded-full shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
