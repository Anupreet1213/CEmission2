import React, { useState, useRef, useEffect } from "react";
import leafImage from "../questions/images/leaf.png";
import logo_v2_1 from "../questions/logo_v2_1.png";
import linkedIn from "../questions/images/linkedin.png";
import twitter from "../questions/images/twitter.png";
import facebook from "../questions/images/facebook.png";
import instagram from "../questions/images/instagram.png";
import Dialog from "./Dialog";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CalculateSection from "./CalculateSection";
import "react-toastify/dist/ReactToastify.css";
import config from "./Chatbot/Config";
import { Chatbot } from "react-chatbot-kit";
import ActionProvider from "./Chatbot/ActionProvider";
import MessageParser from "./Chatbot/MessageParser";
import "react-chatbot-kit/build/main.css";
import ChartHere from "./chart/ChartHere";
import { collection, getDocs, query, where } from "firebase/firestore";
import auth, { db } from "../firebase";

const Main = ({ setHomeQuestion, loggedUser, setCheckUser, setLoggedUser }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoIndustry, setUserInfoIndustry] = useState([]);
  const [contact, setContact] = useState("");
  const [chatBotToggle, setChatBotToggle] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const navigate = useNavigate();

  // For better animation on scroll when a navbar element is used(clicked)
  const scrollWidthOffset2 = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -20;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  // Get history of users from firestore database
  const handleClick3 = async () => {
    const q = query(
      collection(db, "userinfo"),
      where("email", "==", loggedUser.email)
    );

    setOpen(true);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserInfo(doc.data().info.reverse());
      setUserInfoIndustry(doc.data().info2.reverse());
    });
  };

  const handleClick4 = () => {
    if (contact === "") {
      alert("Fill in all details!!");
    } else {
      alert("Thank You For Reaching Out!!");
    }
  };

  const handleClick5 = () => {
    setChatBotToggle((prev) => (prev === 0 ? 1 : 0));
    // setBotIcon((prev) => (prev === 0 ? 1 : 0));
  };

  const handleClick6 = () => {
    alert("Succesfully Signed Up For Our Newsletter");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setCheckUser(0);
        setLoggedUser("");
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [open, setOpen] = useState(false);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div id="mainDiv">
     

      <header className={scrolling ? "navBarScrolled" : ""}>
        <div className="navbarImage">
          <img
            className="logo_v2_1"
            src={logo_v2_1}
            style={{ width: "80%" }}
            alt="React Logo"
          />
        </div>
        <nav ref={navRef}>

          <span
            className={scrolling ? "navLinksScroll" : "navLinks"}
            onClick={() => scrollToSection("home")}
          >
            HOME
          </span>

          <span
            className={scrolling ? "navLinksScroll" : "navLinks"}
            onClick={() => scrollToSection("calculate")}
          >
            CALCULATE
          </span>


          <span
            className={scrolling ? "navLinksScroll" : "navLinks"}
            onClick={() => scrollToSection("history")}
          >
            MY FOOTPRINT
          </span>

          {loggedUser ? (
            <div
              style={{
                backgroundColor: "#165a4a",
                padding: "1rem 1.5rem",
                cursor: "pointer",
                borderRadius: "5px",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontSize: "18px",
                transition: "background-color 0.3s",
                ":hover": {
                  backgroundColor: "#134336",
                },
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#165a4a",
                padding: "1rem 1.5rem",
                cursor: "pointer",
                borderRadius: "5px",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontSize: "18px",
              }}
              onClick={() => navigate("/auth")}
            >
              LOGIN/SIGNUP
            </div>
          )}

          {/* <a href="/#">About me</a> */}
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <div className="mainFirst" id="home">
        <div className="mainFirstDiv">
          <h1 className="mainFirstDivHeading1">ITS TIME TO</h1>
          <h1 className="mainFirstDivHeading2">OFFSET YOUR</h1>
          <h1 className="mainFirstDivHeading3">CARBON FOOTPRINT</h1>
          <h1 className="mainFirstDivHeading4">EMISSIONS</h1>
        </div>
      </div>

      {/* ...................................ChatBot Section.................................. */}

      {chatBotToggle === 1 ? (
        <div className="chatBot">
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
            loggedUser={loggedUser}
            setHomeQuestion={setHomeQuestion}
            setCheckUser={setCheckUser}
            headerText="ChatBot"
            // disableUserInput={true}
            // height={200}
          />
        </div>
      ) : (
        <></>
      )}

      {chatBotToggle === 1 ? (
        <div className="chatBotIcon2" onClick={handleClick5}></div>
      ) : (
        <div className="chatBotIcon" onClick={handleClick5}></div>
      )}

      {/* .................................Mini Section............................ */}

      <div data-aos="fade" className="miniSection">
        <div className="miniSectionDiv">
          <div className="headingMinSection" style={{ width: "100%" }}>
            <h1
              style={{ color: "#165a4a", fontWeight: "400", fontSize: "40px" }}
            >
              Reclaim Green
            </h1>
            <h1
              style={{ color: "#165a4a", fontWeight: "400", fontSize: "40px" }}
            >
              is your one stop solution
            </h1>
          </div>
          <p
            className="minSectionDescription"
            style={{
              color: "#798280",
              fontSize: "22px",
              marginTop: "2%",
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
              // fontSize: "20px",
              // fontWeight:"550"
              lineHeight: "1.2",
            }}
          >
            for tracking, analyzing,cutting carbon of individual, industry level
            and making the world more green and happy place to live!
          </p>

          <button className="getStartedBtn">GET STARTED</button>
        </div>
      </div>

      {/* .................................Card Section............................ */}

      <div data-aos="fade" className="cardsSection">
        <div className="cardsSectionHeading_Description">
          <p className="cardsSectionHeading">
            A simple and streamlined process
          </p>
          <div>
            <p className="cardsSectionDescription">
              Offset your individual, industry level carbon footprint emissions
              and save the world!
            </p>
            <div>
              <p className="cardsSectionMiniDescription">How does it work?</p>
              <p className="cardsSectionMiniDescription">
                Check the journey map given below
              </p>
            </div>
          </div>
        </div>

        <div className="mainCardDiv">
          <div className="card1">
            {" "}
            <h2 style={{ marginBottom: "15%", fontWeight: "200" }}>
              {" "}
              CALCULATE
            </h2>{" "}
          </div>
          <div className="card2">
            {" "}
            <h2 style={{ marginBottom: "15%", fontWeight: "200" }}>
              {" "}
              ANALYZE
            </h2>{" "}
          </div>
          <div className="card3">
            {" "}
            <h2 style={{ marginBottom: "15%", fontWeight: "200" }}>
              REDUCE{" "}
            </h2>{" "}
          </div>
          <div className="card4">
            {" "}
            <h2 style={{ marginBottom: "15%", fontWeight: "200" }}>
              OFFSET{" "}
            </h2>{" "}
          </div>
          <div className="card5">
            {" "}
            <h2 style={{ marginBottom: "15%", fontWeight: "200" }}>
              {" "}
              REGULAR TRACKING
            </h2>{" "}
          </div>
        </div>
      </div>

      {/* .................................Did you know Section............................ */}

      <div data-aos="fade" className="didYouKnow">
        <img className="leafImage" src={leafImage} alt="React Logo" />

        <div className="didYouKnowDescription">
          <p className="headingDidYouKnow">Did you know?</p>
          <p className="textDidYouKnow">
            Carbon Footprint measures greenhouse gases (GHG) emitted into the
            atmosphere which have severely impacted Earth and given birth to
            problems like global warming. Measuring carbon footprint helps us to
            know the GHG-producing areas, and gives us a chance to mitigate them
            and reduce their impact to protect the Earth from further damage.
          </p>
          <p className="subHeadingDidYouKnow">
            Start your journey in creating a sustainable future by calculating
            your carbon footprint today.
          </p>
        </div>
      </div>

      {/* ..........................................Calculate Section....................................... */}

      <CalculateSection
        setHomeQuestion={setHomeQuestion}
        setCheckUser={setCheckUser}
        loggedUser={loggedUser}
      />

      {/* ...............................................Graph Section........................................ */}

      <section data-aos="fade" className="graph" id="history">
        <p className="graphHeading">My Footprint</p>

        {loggedUser ? (
          <div
            style={{
              paddingTop: "4%",
              paddingLeft: "4%",
            }}
          >
            <ChartHere loggedUser={loggedUser} />
          </div>
        ) : (
          <div className="staticGraph"></div>
        )}
        {loggedUser ? (
          <>
            <Dialog
              setOpen={setOpen}
              open={open}
              loggedUser={loggedUser}
              setCheckUser={setCheckUser}
              userInfo={userInfo}
              userInfoIndustry={userInfoIndustry}
            />
            <button className="butt-10" onClick={handleClick3}>
              Show History
            </button>
          </>
        ) : (
          <></>
        )}
        {/* <Drawer setOpen={setOpen} open={open} /> */}
      </section>

      {/* .............................................Contact Us............................................. */}

      <section data-aos="fade" id="contactUs">
        {/* <ToastContainer
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
        /> */}
        <div className="contactUsLeft">
          <p className="contactUsLeftJoin">Join Us</p>
          <p className="contactUsLeftJoin2">Sign Up for our Newsletter!</p>
          <p className="email">E-Mail:</p>
          <input
            placeholder="example123@gmail.com"
            className="inputField"
            contenteditable="false"
          />
          <div
            style={{
              width: "6rem",
              padding: "2% 4% ",
              marginTop: "1%",
              color: "white",
              borderRadius: "5px",
              backgroundColor: "#165a4a",
              cursor: "pointer",
            }}
            onClick={handleClick6}
          >
            SUBMIT
          </div>
          {/* <span className="emailInfo">mahirakhan35@gmail.com</span> */}
        </div>

        <div className="contactUsRight">
          <p className="getInTouch">Get In Touch:</p>
          <div className="inputFieldDiv">
            <input
              placeholder="NAME"
              className="inputField"
              contenteditable="false"
            />
            <input
              placeholder="EMAIL ADDRESS"
              className="inputField"
              contenteditable="false"
            />
            <input
              placeholder="YOUR MESSAGE"
              className="inputFieldM"
              contenteditable="false"
              onChange={(e) => setContact(e.target.value)}
            />
            <div
              style={{
                width: "6rem",
                padding: "2% 4% ",
                marginTop: "1%",
                color: "white",
                borderRadius: "5px",
                backgroundColor: "#165a4a",
                cursor: "pointer",
              }}
              onClick={handleClick4}
            >
              SUBMIT
            </div>
          </div>
        </div>

        <div className="followUsOn">
          <p style={{ marginLeft: "4%", fontSize: "20px", color: "#575757" }}>
            Follow us On :
          </p>
          <div className="socialLinks">
            <img className="linkedIn" src={linkedIn} alt="React Logo" />
            <img className="instagram" src={instagram} alt="React Logo" />
            <img className="twitter" src={twitter} alt="React Logo" />
            <img className="facebook" src={facebook} alt="React Logo" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Main;
