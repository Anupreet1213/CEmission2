import React from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionPage1 = ({
  setToggleQuestion,
  setHomeQuestion,
  eBill,
  setEBill,
  gBill,
  setGBill,
}) => {
  const handleClick = () => {

    // Popup a toaster if the fields are empty else go to the next page
    if (!eBill || !gBill) {
      notify();
    } else {
      setToggleQuestion(2);
    }
  };
  // Toaster styling :
  const notify = () =>
    toast.error("Please fill in all details", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="questionPage1">
      <ArrowBackIosIcon onClick={() => setHomeQuestion(0)} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="questionDiv1">
        <div className="progressBar">
          <div>
            <label>01</label>
            <div className="progess" style={{ backgroundColor: "white" }}></div>
          </div>

          <div>
            <label>02</label>
            <div className="progess" style={{ backgroundColor: "white" }}></div>
          </div>
          <div>
            <label>03</label>
            <div className="progess" style={{ backgroundColor: "white" }}></div>
          </div>

          <div>
            <label>04</label>
            <div className="progess" style={{ backgroundColor: "white" }}></div>
          </div>
        </div>

        <div className="questionElectricity">
          <h1>How much is your monthly Electricity Bill?</h1>
          <TextField
            style={{ width: "20vw", margin: "3%" }}
            id="filled-basic"
            label="Rs."
            variant="filled"
            required
            value={eBill}
            onChange={(e) => setEBill(e.target.value)}
          />
        </div>

        <div className="questionGas">
          <h1>How much is your monthly Gas Bill?</h1>
          <TextField
            style={{ width: "20vw", margin: "3%" }}
            id="filled-basic"
            label="Rs."
            variant="filled"
            required
            value={gBill}
            onChange={(e) => setGBill(e.target.value)}
          />
        </div>
        <button className="nextQuestionPage" onClick={handleClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default QuestionPage1;
