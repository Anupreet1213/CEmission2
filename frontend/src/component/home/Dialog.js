import React, { useEffect, useState } from "react";
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
import { async } from "@firebase/util";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Drawer } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dialog = ({
  loggedUser,
  setCheckUser,
  open,
  setOpen,
  userInfo,
  userInfoIndustry,
}) => {
  // useEffect(() => {
  //   // if (loggedUser) {
  //   document
  //     .getElementById("open-popup-btn")
  //     .addEventListener("click", function () {
  //       // if (loggedUser) {
  //       document.getElementsByClassName("popup")[0].classList.add("active");
  //       console.log("Log ho rha hun mai ");
  //       // } else {
  //       //   setCheckUser(1);
  //       // }
  //     });

  //   document
  //     .getElementById("dismiss-popup-btn")
  //     .addEventListener("click", function () {
  //       document.getElementsByClassName("popup")[0].classList.remove("active");
  //     });
  //   // } else {
  //   //   setCheckUser(1);
  //   // }
  // }, []);

  let sno = 1;
  let sno2 = 1;
  // const [userInfo, setUserInfo] = useState([]);
  // const [userInfoIndustry, setUserInfoIndustry] = useState([]);
  const [febArr, setFebArr] = useState([]);

  // const handleClick3 = async () => {
  //   const q = query(
  //     collection(db, "userinfo"),
  //     where("email", "==", loggedUser.email)
  //   );

  //   const querySnapshot = await getDocs(q);
  //   // console.log(querySnapshot);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     // console.log(doc.id, " => ", doc.data());
  //     setUserInfo(doc.data().info.reverse());
  //     setUserInfoIndustry(doc.data().info2.reverse());
  //     // if (doc.data().info.timestamp === 2) {
  //     //   console.log('febArr');
  //     //   setFebArr(doc.data().info.reverse());
  //     // }
  //     console.log(doc.data().info);
  //     // setUserInfo(userInfo.reverse());
  //     // userId = doc.id;
  //   });
  //   // console.log("====================================");
  //   // console.log(febArr);
  //   // console.log("====================================");
  // };

  const drawerStyle = {
    left: 140,
    top: 80,
    height: "70%",
    width: "80.5%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    display: "flex",
    paddingTop: "2.5rem",
    alignItems: "center",
    // backgroundColor: "#ffffff",
    backgroundColor: "rgb(108,184,166)",
    background:
      "linear-gradient(128deg, rgba(108,184,166,1) 0%, rgba(108,184,166,1) 35%, rgba(96,223,147,1) 100%)",

    boxShadow: "none",
    "@media(max-width: 1080px)": {
      width: "90%",
      height: "60%",
    },
  };

  function handleClick2() {
    setOpen(false);
  }

  return (
    <Drawer
      selected
      className="drawer"
      variant="temporary"
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{ sx: drawerStyle }}
    >
      {/* style={{paddingTop:"5%",paddingLeft:"auto",paddingRight:"auto"}} */}
      {/* <div className="drawerTop">
        <ArrowBackIcon className="arrowBackIcon" onClick={handleClick2} />
      </div> */}
      <div>
        <h1
          style={{
            marginBottom: "2rem",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "600",
            fontSize: "36px",
          }}
        >
          {" "}
          Your Carbon Emission History
        </h1>
      </div>
      {/* {userInfo ? ( */}
      {/* userInfo.map((eachInfo) => { */}
      <Accordion style={{ width: "78vw", marginBottom: "1rem" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Individual </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="tableParent">
            <table className="table">
              <tr>
                <th style={{ borderTopLeftRadius: "12px" }}> # </th>
                <th>Electricity Bill</th>
                <th>Gas Bill</th>
                <th>Car Mileage</th>
                <th>Flight1</th>
                <th>Flight2</th>
                <th>Oil Bill</th>
                <th>Recylcle1</th>
                <th>Recycle2</th>
                <th style={{ borderTopRightRadius: "12px" }}>C.Emission</th>
              </tr>

              {userInfo ? (
                userInfo.map((eachInfo) => {
                  return (
                    <tr>
                      <td> {sno++}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[0]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[1]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[2]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[3]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[4]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[5]}</td>
                      <td style={{ fontSize: "17px" }}>
                        {eachInfo.in[6] === "0" ? "❌" : "✅"}
                      </td>
                      <td style={{ fontSize: "13px" }}>
                        {eachInfo.in[7] === "0" ? "❌" : "✅"}
                      </td>
                      <td style={{ fontSize: "13px" }}>{eachInfo.op}</td>
                    </tr>
                  );
                })
              ) : (
                <div>Sorry, there's no data to display</div>
              )}
            </table>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ width: "78vw" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Industry </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="tableParent">
            <table className="table">
              <tr>
                <th style={{ borderTopLeftRadius: "12px" }}> # </th>
                <th>No.of Floors</th>
                <th>GFA Parking</th>
                <th>GFA Builidings</th>
                <th>SiteEUI</th>
                <th>SourceEUI</th>
                <th>Steam Use</th>
                <th>Electricity</th>
                <th>Natural</th>
                <th style={{ borderTopRightRadius: "12px" }}>C.Emission(kT)</th>
              </tr>

              {userInfoIndustry ? (
                userInfoIndustry.map((eachInfo) => {
                  return (
                    <tr>
                      <td> {sno2++}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[0]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[1]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[2]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[3]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[4]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[5]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[6]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.in[7]}</td>
                      <td style={{ fontSize: "17px" }}>{eachInfo.op[0]}</td>
                    </tr>
                  );
                })
              ) : (
                <div>Sorry, there's no data to display</div>
              )}
            </table>
          </div>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default Dialog;
