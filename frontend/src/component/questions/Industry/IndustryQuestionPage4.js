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
}) => {
  let userinfo = {};
  let userId = "";

  
  // Popup a toaster if the fields are empty else go to the next page
  const handleClick = async () => {


    try{
    if (!electricity || !ngas) {
      notify();
    } else {
      setToggleQuestion(5);
    }

    // Base URL where the post request is sent
    const api = "http://127.0.0.1:5000/query2";

    // Pushing all the input values in input array inArr.
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

    // Creating a query to fetch user info based on the logged-in user's email
    const q = query(
      collection(db, "userinfo"),
      where("email", "==", loggedUser.email)
    );

    // Retrieving the query snapshot asynchronously
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);

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
    console.log(`final array -> ${finalInArr}`);

    // Sending a POST request to an API endpoint with the 'finalInArr' as a query parameter
    const response = await fetch(`${api}?description=${finalInArr}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // parse response
    await response.json().then(async (value) => {
      setOpArrIndustry(value);
      await updateDoc(washingtonRef, {
        info2: arrayUnion({ in: finalInArr, timestamp: new Date(), op: value }),
      });
    });}
     catch(error) {
      console.log("Error in Handleclick: ", error);
     }

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
