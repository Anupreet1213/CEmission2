import React from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IndustryQuestionPage2 = ({
  setToggleQuestion,
  setHomeQuestion,
  building,
  setBuilding,
  siteEUI,
  setSiteEUI,
}) => {
  const handleClick = () => {
      // Popup a toaster if the fields are empty else go to the next page
    if (!building || !siteEUI) {
      notify();
    } else {
      setToggleQuestion(3);
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
      <ArrowBackIosIcon onClick={() => setToggleQuestion(1)} />
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
          <h1>What is the PropertyGFABuilding(s)?</h1>

          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label=""
            variant="filled"
            required
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
        </div>

        <div className="questionGas">
          <h1>What is the SiteEUI(kBtu/sf)?</h1>
          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label=""
            variant="filled"
            required
            value={siteEUI}
            onChange={(e) => setSiteEUI(e.target.value)}
          />
        </div>
        <button className="nextQuestionPage" onClick={handleClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default IndustryQuestionPage2;
