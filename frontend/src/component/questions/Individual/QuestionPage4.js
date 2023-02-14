import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const QuestionPage4 = ({
  setToggleQuestion,
  setToggleResult,
  eBill,
  gBill,
  oBill,
  carMileage,
  flight,
  flight2,
  newspaper,
  setNewspaper,
  tin,
  setTin,
  loggedUser,
  finalInArr,
  opArr,
  setOpArr,
  inArr,
}) => {
  // const [userinfo, setUserinfo] = useState("");

  let userinfo = {};
  let userId = "";

  // const [callApi, setCallApi] = useState("");

  // const description = [1000, 1000, 1200, 10000, 4, 4, 0, 0];

  const handleClick = async () => {
    if (!newspaper || !tin) {
      notify();
    } else {
      setToggleQuestion(5);
      setToggleResult(1);
      // setCallApi("1");
    }

    // useEffect(async () => {
    const api = "http://127.0.0.1:5000/query1";
    // console.log(loggedUser);

    inArr.push(eBill);
    inArr.push(gBill);
    inArr.push(oBill);
    inArr.push(carMileage);
    inArr.push(flight);
    inArr.push(flight2);
    inArr.push(newspaper);
    inArr.push(tin);
    inArr = inArr.slice(inArr.length - 8, inArr.length + 1);
    finalInArr = inArr;

    const q = query(
      collection(db, "userinfo"),
      where("email", "==", loggedUser.email)
    );

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      userinfo = doc.data();
      userId = doc.id;
    });

    const washingtonRef = doc(db, "userinfo", userId);
    console.log(`final array -> ${finalInArr}`);

    const response = await fetch(`${api}?description=${finalInArr}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 3) parse response
    await response.json().then(async (value) => {
      setOpArr(value);
      await updateDoc(washingtonRef, {
        info: arrayUnion({
          in: finalInArr,
          timestamp: 1,
          op: value,
        }),
        // timestamp: new Date().getUTCMonth() + 1,
      });
    });

    // Set the "capital" field of the city 'DC'
  };

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
      <ArrowBackIosIcon onClick={() => setToggleQuestion(3)} />
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
            <div
              className="progess"
              style={{ backgroundColor: "#165a4a" }}
            ></div>
          </div>

          <div>
            <label>04</label>
            <div className="progess" style={{ backgroundColor: "white" }}></div>
          </div>
        </div>

        <div className="questionElectricity">
          <h1>Did you recycle newspapers past year?</h1>
          {/* <div>
            <input
              id="radio-yes-21"
              name="question-2"
              type="radio"
              // value="1"
            />
            <label>
              <span>Yes</span>
            </label>
            <input
              id="radio-no-22"
              name="question-2"
              type="radio"
              // value="0"
            />
            <label>
              <span>No</span>
            </label>
          </div> */}

          <div class="container">
            <input
              type="radio"
              name="radio"
              value={newspaper}
              onChange={() => setNewspaper("1")}
            />
            <label for="opt1" class="label1">
              <span>YES</span>
            </label>
            <input
              type="radio"
              name="radio"
              value={newspaper}
              onChange={() => setNewspaper("0")}
            />
            <label for="opt2" class="label2">
              <span>NO</span>
            </label>
          </div>
        </div>

        <div className="questionGas">
          <div>
            <h1>Did you recycle Aluminium and Tin past year?</h1>
            <div>
              <input
                name="question-2"
                type="radio"
                onChange={() => setTin("1")}
                value={tin}
              />
              <label>
                <span>YES</span>
              </label>
              <input
                name="question-2"
                type="radio"
                onChange={() => setTin("0")}
                value={tin}
              />
              <label>
                <span>NO</span>
              </label>
            </div>
          </div>
          <button className="nextQuestionPage" onClick={handleClick}>
            RESULTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage4;
