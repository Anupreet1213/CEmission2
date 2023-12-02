import { TextField } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import auth from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Signup = ({ setToggleAuth, setLoggedUser, setCheckUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    // console.log(email);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoggedUser(user);
        setCheckUser(0);
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const warning = errorCode.slice(5, errorCode.length);
        notify(warning);
        // ..
      });

    try {
      const docRef = await addDoc(collection(db, "userinfo"), {
        email: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const notify = (warning) =>
    toast.warn(warning, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="loginAuth">
      <div className="loginDialog">
        <h1 className="loginTitle">CREATE ACCOUNT</h1>
        <div className="authInput">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            id="custom-css-outlined-input"
          />
        </div>

        <div className="authInput">
          <TextField
            type="password"
            label="Password"
            id="custom-css-outlined-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="authButton"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          SIGN UP
        </button>
        <div>
          <h4 style={{ display: "inline", fontWeight: "500" }}>
            Already have an account?{" "}
          </h4>
          <h4
            onClick={() => setToggleAuth(false)}
            style={{
              display: "inline",
              color: "#165A4A",
              fontWeight: "500",
              cursor: "pointer",
            }}
          >
            Log In
          </h4>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Signup;
