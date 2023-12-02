import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Question from "../questions/Individual/Question";
import IndustryQuestion from "../questions/Industry/IndustryQuestion";
import Main from "./Main";

const Home = ({ loggedUser, setCheckUser }) => {
  // Effect for animation on scroll using AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // To manage toggle between Individual, Industry and Main
  const [homeQuestion, setHomeQuestion] = useState(0);

  return (
    <div>
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
          loggedUser={loggedUser}
          setCheckUser={setCheckUser}
        />
      )}
    </div>
  );
};

export default Home;
