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
  FieldValue,
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

  let userinfo = {};
  let userId = "";

  const handleClick = async () => {

    try{

   
       // Popup a toaster if the fields are empty else go to the next page
    if (!newspaper || !tin) {
      notify();
    } else {
      setToggleQuestion(5);
      setToggleResult(1);
    }

     // Base URL where the post request is sent
    const api = "http://127.0.0.1:5000/query1";
 
    // Pushing all the input values in input array inArr.
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

    // Creating a query to fetch user info based on the logged-in user's email
    const q = query(
      collection(db, "userinfo"),
      where("email", "==", loggedUser.email)
    );

    // Retrieving the query snapshot asynchronously
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

     // Looping through the query snapshot to extract userinfo and userId

     if(querySnapshot.empty){
       // If the userinfo document doesn't exist, create it
       const newDocRef = await addDoc(collection(db, "userinfo"), {
        email: loggedUser.email,
      });
     }
     else {
      querySnapshot.forEach((doc) => {
        userinfo = doc.data(); // Extracting user information from the document
        userId = doc.id; // Extracting the document ID (userId)
     });
     }
   
   
    // Creating a reference to the specific document in the 'userinfo' collection using the userId
    const washingtonRef = doc(db, "userinfo", userId);

    // Logging the content of 'finalInArr'
    console.log(`final array -> ${finalInArr}`);

    // Sending a POST request to an API endpoint with the 'finalInArr' as a query parameter
    const response = await fetch(`${api}?description=${finalInArr}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let sno = 1;

 
    //  parse response
    await response.json().then(async (value) => {
      setOpArr(value);
      await updateDoc(washingtonRef, {
        info: arrayUnion({
          in: finalInArr,
          op: value,
        }),
      }) });
   
  } catch (error){
    console.error("Error in handleClick:", error);
  };
  
  };
  

 


  // Styling the toaster
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
        <div
          className="progressBar"
          style={{ marginTop: "-12%", marginBottom: "10%" }}
        >
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
          <div>
            <h1>Did you recycle newspapers past year?</h1>
            <div
              style={{
                display: "flex",
                gap: "11%",
                justifyContent: "center",
              }}
            >
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    value="yes"
                    style={{ opacity: "0" }}
                    onChange={() => setNewspaper("1")}
                  />
                  <span class="radio-button"></span>
                  <span class="label-text">Yes</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    value="no"
                    style={{ opacity: "0" }}
                    onChange={() => setNewspaper("0")}
                  />
                  <span class="radio-button"></span>
                  <span class="label-text">No</span>
                </label>
              </div>
            </div>
           
          </div>
        </div>

        <div className="questionGas">
          <div>
            <h1>Did you recycle Aluminium and Tin past year?</h1>
            <div
              style={{ display: "flex", gap: "10%", justifyContent: "center" }}
            >
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio2"
                    value="yes"
                    style={{ opacity: "0" }}
                    onChange={() => setTin("1")}
                  />
                  <span class="radio-button"></span>
                  <span class="label-text">Yes</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="radio2"
                    value="no"
                    style={{ opacity: "0" }}
                    onChange={() => setTin("0")}
                  />
                  <span class="radio-button"></span>
                  <span class="label-text">No</span>
                </label>
              </div>
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
