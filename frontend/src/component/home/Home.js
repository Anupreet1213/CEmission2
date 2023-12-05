import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Question from "../questions/Individual/Question";
import IndustryQuestion from "../questions/Industry/IndustryQuestion";
import Login from "../auth/Login";
import Main from "./Main";
import { async } from "@firebase/util";
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
import { db } from "../firebase";
import Recommend from "../questions/Individual/Recommend";
import RecommendIndustry from "../questions/Industry/RecommendIndustry";



const Home = ({ loggedUser, setCheckUser }) => {

  // Logic for Animate on Scroll : 

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [homeQuestion, setHomeQuestion] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* Logic for switching between Pages (Main, Individual Question Page and Industry Question Page) */}
      
      {homeQuestion === 1 ? (
        <Question setHomeQuestion={setHomeQuestion} loggedUser={loggedUser} />
      ) : homeQuestion === 2 ? (
        <IndustryQuestion
          setHomeQuestion={setHomeQuestion}
          loggedUser={loggedUser}
        />
      ) : (
        <Main
          setHomeQuestion={setHomeQuestion}
          homeQuestion={homeQuestion}
          loggedUser={loggedUser}
          setCheckUser={setCheckUser}
        />
      )}
    </div>
  );
};

export default Home;
