import React, { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { FaRecycle } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import logo from '../images/logo.png';

const RecommendIndustry = ({setToggleQuestion,opArrIndustry,setHomeQuestion}) => {

  const [recommendToggle, setRecommendToggle] = useState(1);

  const progressBar = document.getElementsByClassName("progressDiv")[0];
  // const leftPart = document.getElementsByClassName("recLeft")[0];
  const left11 = document.getElementsByClassName("left1")[0];
  const left12 = document.getElementsByClassName("left1")[1];
  const left2 = document.getElementsByClassName("left2")[0];
  // const left3 = document.getElementsByClassName("left3")[0];
  // const left4 = document.getElementsByClassName("left4")[0];

  const handleClick = () => {
    setRecommendToggle(1);
    progressBar.style.top = "27%";
    left11.style.color = "white";
    left12.style.color = "white";
    left2.style.color = "#ccc";
   
  };

  const handleClick2 = () => {
    setRecommendToggle(2);
    progressBar.style.top = "59%";
    left11.style.color = "#ccc";
    left12.style.color = "#ccc";
    left2.style.color = "white";
    
  };



  return (
    <div className="recMain">
    <div className="recChild">
      <div className="recLeft" style={{gap:"30px"}}>
        <div>
          
          <TipsAndUpdatesIcon  className="left1"/>
          <h3 onClick={handleClick}  className="left1">Site EUI</h3>
        </div>
        <div className="left2">
          <DirectionsCarIcon />
          <h3 onClick={handleClick2}>Source EUI</h3>
        </div>
      </div>
      <div className="recProgressBar" style={{height:"60%"}}>
        <div className="progressDiv"></div>
      </div>
      <div className="recRight">
        {recommendToggle === 1 ? (
          <div>
            <h1>Site EUI</h1>
            <div>{opArrIndustry[1]}</div>
           
          </div>
        ) :  (
          <div>
            <h1>Source EUI</h1>
           
            <div>{opArrIndustry[2]}</div>
          </div>
        ) }
      </div>
      <CloseIcon className="closeIcon" onClick={() => setToggleQuestion(5)} />
    </div>
    
    <img className="recLogo" src={logo} onClick={() => setHomeQuestion(3)} /> 
  </div>
  )
}

export default RecommendIndustry