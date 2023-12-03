import React from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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
// import Home from "../home/Home";

const IndustryQuestionPage4 = ({
  setToggleQuestion,
  setHomeQuestion,
  floor,
  parking,
  building,
  siteEUI,
  sourceEUI,
  steam,
  electricity,
  setElectricity,
  ngas,
  setNgas,
  inArr,
  finalInArr,
  loggedUser,
  setOpArrIndustry,
  opArrIndustry,
}) => {
  let userinfo = {};
  let userId = "";

  const api = "http://127.0.0.1:5000/query2";

  const handleClick = async () => {
    if (!electricity || !ngas) {
      notify();
    } else {
      setToggleQuestion(5);
    }

    inArr.push(floor);
    inArr.push(parking);
    inArr.push(building);
    inArr.push(siteEUI);
    inArr.push(sourceEUI);
    inArr.push(steam);
    inArr.push(electricity);
    inArr.push(ngas);
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
      // userinfo = doc.data();
      userId = doc.id;
    });

    const washingtonRef = doc(db, "userinfo", userId);
    // console.log(`final array -> ${finalInArr}`);

    // const response = await fetch(`${api}?description=${finalInArr}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // 3) parse response
    // await response.json().then(async (value) => {
    //   setOpArrIndustry(value);
    //   await updateDoc(washingtonRef, {
    //     info2: arrayUnion({ in: finalInArr, timestamp: new Date(), op: value }),
    //   });
    // });
    setOpArrIndustry((0.2 + Math.random() * (5 - 0.2)).toFixed(2));
    await updateDoc(washingtonRef, {
      info2: arrayUnion({
        in: finalInArr,
        op: opArrIndustry[0],
      }),
    });

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
  };

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
          <h1>What is the Electricity Usage(kBtu)?</h1>

          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label=""
            variant="filled"
            required
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
          />
        </div>

        <div className="questionGas">
          <h1>What is the Natural Gas Usage(kBtu)?</h1>
          <TextField
            style={{ width: "30%", margin: "3%" }}
            id="filled-basic"
            label=""
            variant="filled"
            required
            value={ngas}
            onChange={(e) => setNgas(e.target.value)}
          />
        </div>
        <button className="nextQuestionPage" onClick={handleClick}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default IndustryQuestionPage4;
