import React, { useEffect, useState } from "react";
// import logo from '../';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
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

const Result = ({
  setToggleQuestion,
  loggedUser,
  finalInArr,
  opArr,
  inArr,
}) => {
  // let userId = "";

  // const saveOP = async () => {
  //   const q = query(
  //     collection(db, "userinfo"),
  //     where("email", "==", loggedUser.email)
  //   );

  //   const querySnapshot = await getDocs(q);
  //   // console.log(querySnapshot);
  //   querySnapshot.forEach((doc) => {
  //     userId = doc.id;
  //   });

  //   const washingtonRef = doc(db, "userinfo", userId);

  //   // Set the "capital" field of the city 'DC'
  //   await updateDoc(washingtonRef, {
  //     info: arrayUnion({ op: opArr }),
  //   });
  // };

  // saveOP();
  console.log(opArr);

  return (
    <div className="resultDiv">
      <ArrowBackIosIcon onClick={() => setToggleQuestion(4)} />
      {/* <img className="resultLogo" src={logo} alt="React Logo" /> */}
      <div className="resultSubDiv">
        <div className="resultLeft">
          <h2
            style={{
              padding: "5%",
              marginTop: "6%",
              marginLeft: "5%",
              color: "white",
            }}
          >
            Result
          </h2>
          <div
            className="resultInputInfo"
            style={{ marginLeft: "10%", color: "white" }}
          >
            <p className="resultInputEachInfo">
              Your monthly Electricity Bill :{inArr[0]}
            </p>

            <p className="resultInputEachInfo">
              Your monthly Gas Bill : {inArr[1]}
            </p>
            <p className="resultInputEachInfo">
              Your monthly Oil Bill : {inArr[2]}
            </p>
            <p className="resultInputEachInfo">
              Your yearly Car Mileage : {inArr[3]}
            </p>
            <p className="resultInputEachInfo">
              Your Your Past year number of flights travels for 4hrs or less
              duration : {inArr[4]}
            </p>
            <p className="resultInputEachInfo">
              Your Your Past year number of flights travels for 4hrs or more
              duration : {inArr[5]}
            </p>
            <p className="resultInputEachInfo">
              Recycled newspapers past year : {inArr[6] === "0" ? "❌" : "✅"}
            </p>
            <p className="resultInputEachInfo">
              Recycled Aluminium & Tin past year :{" "}
              {inArr[7] === "0" ? "❌" : "✅"}
            </p>
          </div>
        </div>
        <div className="resultRight">
          <div className="carbonEmissionResult">
            <div style={{ marginTop: "59%" }}>
              <p>Your Average Carbon Emission is :</p>
              <h1> {opArr} tonnes</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Result;
