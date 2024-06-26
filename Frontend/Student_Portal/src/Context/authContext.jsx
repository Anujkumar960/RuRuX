import React, { createContext, useContext, useState } from "react";
import axios from "axios"
export const AuthContext = createContext();

const userRes = {
  isAuth: false,
  token: "",
  isAdmin: "",
  isStudent:"",
  studentId:""
};


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [LoggedIn, setLoggedIn] = useState(userRes);

  const handleLogin = async ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(email, password);
        const res = await axios.post("https://rurux.onrender.com/login", {
          email,
          password,
        });
        if (res) {
          console.log(res);
          setLoggedIn({
            isAuth: true,
            token: res.data.token,
            isAdmin: res.data.isAdmin,
            isStudent:res.data.isStudent,
            studentId:res.data.userID
          });
        }
         console.log(res.data.token);
        localStorage.setItem("accessToken", res.data.token);
        resolve();
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  };
  console.log(LoggedIn);

  const handleSignUp = async (obj) => {
    try {
      const res = await axios.post("https://rurux.onrender.com/register", obj);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
            try {
              const token = localStorage.getItem("accessToken");
              const res = await axios.get("https://rurux.onrender.com/logout", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(res);
              setLoggedIn(userRes);
              localStorage.removeItem("accessToken");
            } catch (error) {
              console.log(error);
            }
          };


  //
  return (
    <AuthContext.Provider value={{  handleLogout,handleSignUp,handleLogin,LoggedIn,setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

