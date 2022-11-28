import React, { createContext, useState } from "react";

export const AuthContext = React.createContext({
  loggedIn: false,
  updateLogin: (status) => {},
  token: "",
});

export const AuthContextProvider = (props) => {
  let [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("logged_in"))
  );

  let [token, setToken] = useState(localStorage.getItem("token"));

  let updateLogin = (status) => {
    setLoggedIn(status);
    localStorage.setItem("logged_in", status);
  };

  let updateToken = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        updateLogin: updateLogin,
        token: token,
        updateToken: updateToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
