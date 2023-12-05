import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { FaRecycle } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../images/logo.png";

const Recommend = ({ setToggleQuestion, opArr, setHomeQuestion }) => {
  const [recommendToggle, setRecommendToggle] = useState(1);

  const progressBar = document.getElementsByClassName("progressDiv")[0];
  // const leftPart = document.getElementsByClassName("recLeft")[0];
  const left11 = document.getElementsByClassName("left1")[0];
  const left12 = document.getElementsByClassName("left1")[1];
  const left21 = document.getElementsByClassName("left2")[0];
  const left22 = document.getElementsByClassName("left2")[1];
  const left3 = document.getElementsByClassName("left3")[0];
  const left4 = document.getElementsByClassName("left4")[0];

  const handleClick = () => {
    setRecommendToggle(1);
    progressBar.style.top = "3%";
    left11.style.color = "white";
    left12.style.color = "white";
    left21.style.color = "#ccc";
    left22.style.color = "#ccc";
    left3.style.color = "#ccc";
    left4.style.color = "#ccc";
  };

  const handleClick2 = () => {
    setRecommendToggle(2);
    progressBar.style.top = "28%";
    left11.style.color = "#ccc";
    left12.style.color = "#ccc";
    left21.style.color = "white";
    left22.style.color = "white";
    left3.style.color = "#ccc";
    left4.style.color = "#ccc";
  };

  const handleClick3 = () => {
    setRecommendToggle(3);
    progressBar.style.top = "48%";
    left11.style.color = "#ccc";
    left12.style.color = "#ccc";
    left21.style.color = "#ccc";
    left22.style.color = "#ccc";
    left3.style.color = "white";
    left4.style.color = "#ccc";
  };

  const handleClick4 = () => {
    setRecommendToggle(4);
    progressBar.style.top = "68%";
    left11.style.color = "#ccc";
    left12.style.color = "#ccc";
    left21.style.color = "#ccc";
    left22.style.color = "#ccc";
    left3.style.color = "#ccc";
    left4.style.color = "white";
  };

  return (
    <div className="recMain">
      <div className="recChild">
        <div className="recLeft">
          <div>
            <TipsAndUpdatesIcon className="left1" />
            <h3 className="left1" onClick={handleClick}>
              Electricity
            </h3>
          </div>
          <div>
            <DirectionsCarIcon className="left2" />
            <h3 className="left2" onClick={handleClick2}>
              Car Mileage
            </h3>
          </div>
          <div className="left3">
            <NewspaperIcon />
            <h3 onClick={handleClick3}>Newspapers</h3>
          </div>

          <div className="left4">
            <FaRecycle style={{ fontSize: "1.7rem" }} />
            <h3 onClick={handleClick4}>Aluminium & Tin</h3>
          </div>
        </div>
        <div className="recProgressBar">
          <div className="progressDiv"></div>
        </div>
        <div className="recRight">
          {recommendToggle === 1 ? (
            <div>
              <h1>Electricity Bill</h1>
              <div>{opArr[1]}</div>
            </div>
          ) : recommendToggle === 2 ? (
            <div>
              <h1>Car Mileage</h1>

              <div>{opArr[2]}</div>
            </div>
          ) : recommendToggle === 3 ? (
            <div>
              <h1>Recycling Newspapers</h1>
              <div>{opArr[3]}</div>
            </div>
          ) : (
            <div>
              <h1>Recycling Aluminium & Tin</h1>
              <div>{opArr[4]}</div>
            </div>
          )}
        </div>
        <CloseIcon className="closeIcon" onClick={() => setToggleQuestion(5)} />
      </div>
      {/* <button onClick={() => setToggleQuestion(5)}> wapas aa ja </button> */}
      <img className="recLogo" src={logo} onClick={() => setHomeQuestion(3)} />
    </div>
  );
};

export default Recommend;
