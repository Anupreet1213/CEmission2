import React, { useEffect, useState } from "react";
import IndustryQuestionPage1 from "./IndustryQuestionPage1";
import IndustryQuestionPage2 from "./IndustryQuestionPage2";
import IndustryQuestionPage3 from "./IndustryQuestionPage3";
import IndustryQuestionPage4 from "./IndustryQuestionPage4";
import IndustryResult from "./IndustryResult";
import RecommendIndustry from "./RecommendIndustry";

const Question = ({ setHomeQuestion, loggedUser }) => {

   // States maintaining all the input values :
  const [toggleQuestion, setToggleQuestion] = useState(1);
  const [floor, setFloor] = useState("");
  const [parking, setParking] = useState("");
  const [building, setBuilding] = useState("");
  const [siteEUI, setSiteEUI] = useState("");
  const [sourceEUI, setSourceEUI] = useState("");
  const [steam, setSteam] = useState("");
  const [electricity, setElectricity] = useState("");
  const [ngas, setNgas] = useState("");
  const [opArrIndustry, setOpArrIndustry] = useState([]);
  const [inArr, setInArr] = useState([]);

  let finalInArr = [];

  const [toggleResult, setToggleResult] = useState(0);

  return (
    <>
    {/* Logic for changing Question Page on click of Next */}
      {toggleQuestion === 1 ? (
        <IndustryQuestionPage1
          setToggleQuestion={setToggleQuestion}
          setHomeQuestion={setHomeQuestion}
          floor={floor}
          setFloor={setFloor}
          parking={parking}
          setParking={setParking}
        />
      ) : toggleQuestion === 2 ? (
        <IndustryQuestionPage2
          setToggleQuestion={setToggleQuestion}
          building={building}
          setBuilding={setBuilding}
          siteEUI={siteEUI}
          setSiteEUI={setSiteEUI}
        />
      ) : toggleQuestion === 3 ? (
        <IndustryQuestionPage3
          setToggleQuestion={setToggleQuestion}
          sourceEUI={sourceEUI}
          setSourceEUI={setSourceEUI}
          steam={steam}
          setSteam={setSteam}
        />
      ) : toggleQuestion === 4 ? (
        <IndustryQuestionPage4
          setToggleQuestion={setToggleQuestion}
          floor={floor}
          parking={parking}
          building={building}
          siteEUI={siteEUI}
          sourceEUI={sourceEUI}
          steam={steam}
          electricity={electricity}
          setElectricity={setElectricity}
          ngas={ngas}
          setNgas={setNgas}
          setToggleResult={setToggleResult}
          loggedUser={loggedUser}
          setOpArrIndustry={setOpArrIndustry}
          inArr={inArr}
          finalInArr={finalInArr}
        />
      ) : toggleQuestion === 5 ?
      (
        <IndustryResult
          setToggleQuestion={setToggleQuestion}
          toggleResult={toggleResult}
          opArrIndustry={opArrIndustry}
          finalInArr={finalInArr}
          setHomeQuestion={setHomeQuestion}
          inArr={inArr}
        />
      ) :
      <RecommendIndustry 
      setToggleQuestion={setToggleQuestion}
      opArrIndustry={opArrIndustry}
      setHomeQuestion={setHomeQuestion}
      />
    }
    </>
  );
};

export default Question;
