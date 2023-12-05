import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Auth = ({ setLoggedUser, setCheckUser, loggedUser }) => {
  const [toggleAuth, setToggleAuth] = useState(false);

  return (
    <>
      {toggleAuth ? (
        <Signup
          setToggleAuth={setToggleAuth}
          setLoggedUser={setLoggedUser}
          setCheckUser={setCheckUser}
          loggedUser={loggedUser}
        />
      ) : (
        <Login
          setToggleAuth={setToggleAuth}
          setLoggedUser={setLoggedUser}
          setCheckUser={setCheckUser}
        />
      )}
    </>
  );
};

export default Auth;
