import React, { useEffect, useState } from "react";
import QuestionPage1 from "./QuestionPage1";
import QuestionPage3 from "./QuestionPage3";
import QuestionPage2 from "./QuestionPage2";
import QuestionPage4 from "./QuestionPage4";
import Result from "./Result";
import Recommend from "./Recommend";

const Question = ({ setHomeQuestion, loggedUser }) => {

  // States maintaining all the input values :
  const [toggleQuestion, setToggleQuestion] = useState(1);
  const [eBill, setEBill] = useState("");
  const [gBill, setGBill] = useState("");
  const [oBill, setOBill] = useState("");
  const [carMileage, setCarMileage] = useState("");
  const [flight, setFlight] = useState("");
  const [flight2, setFlight2] = useState("");
  const [newspaper, setNewspaper] = useState("");
  const [tin, setTin] = useState("");
  const [inArr, setInArr] = useState([]);
  const [opArr, setOpArr] = useState([]);

  let finalInArr = [];

  const [toggleResult, setToggleResult] = useState(0);

  return (
    <>
    {/* Logic for changing Question Page on click of Next */}
      {toggleQuestion === 1 ? (
        <QuestionPage1
          setToggleQuestion={setToggleQuestion}
          setHomeQuestion={setHomeQuestion}
          eBill={eBill}
          setEBill={setEBill}
          gBill={gBill}
          setGBill={setGBill}
        />
      ) : toggleQuestion === 2 ? (
        <QuestionPage2
          setToggleQuestion={setToggleQuestion}
          oBill={oBill}
          setOBill={setOBill}
          carMileage={carMileage}
          setCarMileage={setCarMileage}
        />
      ) : toggleQuestion === 3 ? (
        <QuestionPage3
          setToggleQuestion={setToggleQuestion}
          flight={flight}
          setFlight={setFlight}
          flight2={flight2}
          setFlight2={setFlight2}
        />
      ) : toggleQuestion === 4 ? (
        <QuestionPage4
          setToggleQuestion={setToggleQuestion}
          eBill={eBill}
          gBill={gBill}
          oBill={oBill}
          carMileage={carMileage}
          flight={flight}
          flight2={flight2}
          newspaper={newspaper}
          setNewspaper={setNewspaper}
          tin={tin}
          setTin={setTin}
          setToggleResult={setToggleResult}
          loggedUser={loggedUser}
          opArr={opArr}
          setOpArr={setOpArr}
          inArr={inArr}
          finalInArr={finalInArr}
        />
      ) : toggleQuestion === 5 ? (
        <Result
          setToggleQuestion={setToggleQuestion}
          toggleResult={toggleResult}
          opArr={opArr}
          inArr={inArr}
          loggedUser={loggedUser}
          setHomeQuestion={setHomeQuestion}
        />
      ) : (
        <Recommend
          setToggleQuestion={setToggleQuestion}
          opArr={opArr}
          setHomeQuestion={setHomeQuestion}
        />
      )}
    </>
  );
};

export default Question;
