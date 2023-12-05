import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
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
import { db } from "../../firebase";

// const ChartHere = ({loggedUser}) => {
//   let userinfo=[];
//   useEffect(() => {
//     const getData = async () => {
//       const q = query(
//         collection(db, "userinfo"),
//         where("email", "==", loggedUser.email)
//       );

//       const querySnapshot = await getDocs(q);
//       console.log(querySnapshot);
//       querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.id, " => ", doc.data());
//         userinfo = doc.data();
//         // userId = doc.id;
//       });
//     };
//     getData();
//   },[]);

//   console.log('====================================');
//   console.log(userinfo);
//   console.log('====================================');

//   const UserData = [
//     {
//       id: 1,
//       year: 2016,
//       userGain: 8500,
//     },
//     {
//       id: 2,
//       year: 2017,
//       userGain: 9000,
//     },
//     {
//       id: 3,
//       year: 2018,
//       userGain: 8000,
//     },
//     {
//       id: 4,
//       year: 2019,
//       userGain: 8000,
//     },
//   ];

//   const [userData, setUserData] = useState({
//     labels: UserData.map((data) => data.year),
//     datasets: [
//       {
//         label: "Users Gained",
//         data: UserData.map((data) => data.userGain),
//       },
//     ],
//   });
//   return (
//     <div>
//       <Bar data={userData} />;
//     </div>
//   );
// };
const ChartHere = ({ loggedUser }) => {
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "userinfo"),
        where("email", "==", loggedUser.email)
      );

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const userinfo = [];
      const userinfo2 = [];
      // const xNo = [];
      // let len = 0;
      querySnapshot.forEach((doc) => {
        userinfo.push(doc.data().info);
        userinfo2.push(doc.data().info2);
        // xNo.push(len + 1);
      });

      setUserData({
        // labels: userinfo.map((data) => data.year),
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: "Carbon Emissions",
            backgroundColor: "#165A4A",
            data: userinfo.flatMap((innerArr) =>
              innerArr.map(({ op }) => op[0])
            ),
          },
        ],
      });
    };
    getData();
  }, [loggedUser.email]);

  return (
    <div id="history" style={{ width: "80vw", height: "80vh" }}>
      <Bar data={userData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default ChartHere;
