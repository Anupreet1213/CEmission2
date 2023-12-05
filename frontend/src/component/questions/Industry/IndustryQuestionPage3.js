import React from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IndustryQuestionPage3 = ({
  setToggleQuestion,
  setHomeQuestion,
  sourceEUI,
  setSourceEUI,
  steam,
  setSteam,
}) => {
  const handleClick = () => {
     // Popup a toaster if the fields are empty else go to the next page
    if (!sourceEUI || !steam) {
      notify();
    } else {
      setToggleQuestion(4);
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
      <ArrowBackIosIcon onClick={() => setToggleQuestion(2)} />
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
            <div
              className="progess"
              style={{ backgroundColor: "#165a4a" }}
            ></div>
          </div>

          <div>
            <label>02</label>
            <div
              className="progess"
              style={{ backgroundColor: "#165a4a" }}
            ></div>
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
          <h1>What is the SourceEUI(kBtu/sf)?</h1>

          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label=""
            variant="filled"
            required
            value={sourceEUI}
            onChange={(e) => setSourceEUI(e.target.value)}
          />
        </div>

        <div className="questionGas">
          <h1>What is the SteamUse(kBtu)?</h1>
          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label=""
            variant="filled"
            required
            value={steam}
            onChange={(e) => setSteam(e.target.value)}
          />
        </div>
        <button className="nextQuestionPage" onClick={handleClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default IndustryQuestionPage3;
