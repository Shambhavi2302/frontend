import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isAdmin, setAdmin] = useState(false);


  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false);
    setAdmin(false);
  };

  const admin = () => {
    setAdmin(true);
  }


  return (
    <UserContext.Provider value={{ isLoggedIn,isAdmin, admin, user,login,logout}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);