import React from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionPage3 = ({
  setToggleQuestion,
  flight,
  setFlight,
  flight2,
  setFlight2,
}) => {
  const handleClick = () => {
     // Popup a toaster if the fields are empty else go to the next page
    if (!flight || !flight2) {
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
        <div className="progressBar" style={{ marginTop: "3.5%" }}>
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
          <h1>How many number of flights did you take past year?</h1>
          <p style={{ color: "gray" }}>Duration of flight: 4 hour or less</p>
          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label="No."
            variant="filled"
            value={flight}
            onChange={(e) => setFlight(e.target.value)}
          />
        </div>

        <div className="questionGas">
          <h1>How many number of flights did you take past year?</h1>
          <p style={{ color: "gray" }}>Duration of flight: 4 hour or more</p>
          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label="No."
            variant="filled"
            value={flight2}
            onChange={(e) => setFlight2(e.target.value)}
          />
        </div>
        <button className="nextQuestionPage" onClick={handleClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default QuestionPage3;
