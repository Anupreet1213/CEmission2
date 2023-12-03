// components/Options.js
import React from "react";
import { createChatBotMessage, createClientMessage } from "react-chatbot-kit";
import "./Options.css";
import { HashLink as Link } from "react-router-hash-link";
import { BrowserRouter } from "react-router-dom";

const Options = (props) => {
  //   const { handleClick } = props;
  const { setState, steps, loggedUser, setCheckUser } = props;

  const handleClick = (widget) => {
    const message = createClientMessage(widget, { widget });

    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  const scrollWidthOffset2 = (el) => {
    if (loggedUser) {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -20;
      window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
    } else {
      setCheckUser(1);
    }
  };

  window.onscroll = function () {
    const mainDiv = document.getElementById("mainDiv");
    if (
      document.body.scrollTop >= 30 ||
      document.documentElement.scrollTop >= 30
    ) {
      mainDiv.classList.add("scroll");
    } else {
      mainDiv.classList.remove("scroll");
    }
  };

  return (
    // <BrowserRouter>
    <div className="options-container">
      <button
        className="option-button butt-9"
        onClick={() => handleClick("Web Assistance")}
      >
        <span>Web Assistance</span>
      </button>
      {/* <Link to="#history" scroll={(el) => scrollWidthOffset2(el)}> */}
      <button
        className="option-button butt-9"
        onClick={() => handleClick("Check Previous Records")}
      >
        <span>Check Previous Records</span>
      </button>
      {/* </Link> */}
      <button
        className="option-button butt-9"
        onClick={() => handleClick("Rate Your Experience")}
      >
        <span>Rate Your Experience</span>
      </button>
    </div>
    // </BrowserRouter>
  );
};

export default Options;
