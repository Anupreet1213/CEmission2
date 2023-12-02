import React, { useState } from "react";
import Auth from "./auth/Auth";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import Home from "./home/Home";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [checkUser, setCheckUser] = useState(0);

  return (
    <div>
      {/* {loggedUser ? (
        <Home loggedUser={loggedUser} />
      ) : (
        <Auth setLoggedUser={setLoggedUser} />
      )} */}
      {checkUser === 0 ? (
        <Home
          setCheckUser={setCheckUser}
          loggedUser={loggedUser}
          checkUser={checkUser}
          setLoggedUser={setLoggedUser}
        />
      ) : (
        <Auth setCheckUser={setCheckUser} setLoggedUser={setLoggedUser} />
      )}
      {/* <Home /> */}
    </div>
  );
}

export default App;
