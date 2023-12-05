import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setToggleAuth, setLoggedUser, setCheckUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("hello");
        // Signed in
        const user = userCredential.user;
        setLoggedUser(user);
        setCheckUser(0);
        navigate("/");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const warning = errorCode.slice(5, errorCode.length);
        notify(errorCode);
        // const errorMessage = error.message;
        // alert(warning);
      });
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
        <h1 className="loginTitle">WELCOME BACK</h1>
        <div className="authInput">
          <TextField
            // className="authInput"
            label="Email"
            id="custom-css-outlined-input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="authInput">
          <TextField
            // className="authInput"
            type="password"
            label="Password"
            id="custom-css-outlined-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="authButton" style={{cursor:"pointer" }} onClick={handleClick}>
          Login
        </button>
        <div>
          <h4 style={{ display: "inline", fontWeight: "500" }}>
            Don't have an account ?{" "}
          </h4>
          <h4
            onClick={() => {
              setToggleAuth(true);
            }}
            style={{ display: "inline", color: "#165A4A", fontWeight: "500",cursor:"pointer" }}
          >
            Sign Up
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

export default Login;
