import React, { useState } from "react";
import Auth from "./auth/Auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import Home from "./home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // State to store user details and toggle between components
  const [loggedUser, setLoggedUser] = useState("");
  const [checkUser, setCheckUser] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCheckUser={setCheckUser}
                loggedUser={loggedUser}
                checkUser={checkUser}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          {loggedUser ? (
            <>
              <Route
                path="/"
                element={
                  <Home
                    setCheckUser={setCheckUser}
                    loggedUser={loggedUser}
                    checkUser={checkUser}
                    setLoggedUser={setLoggedUser}
                  />
                }
              />
            </>
          ) : (
            <>
              <Route
                path="/auth"
                element={
                  <Auth
                    setCheckUser={setCheckUser}
                    setLoggedUser={setLoggedUser}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Home
                    setCheckUser={setCheckUser}
                    loggedUser={loggedUser}
                    checkUser={checkUser}
                    setLoggedUser={setLoggedUser}
                  />
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
