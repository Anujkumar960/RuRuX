// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./Context/authContext.jsx";

// import { AuthProvider } from "./Admin/Context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
     <ChakraProvider>
      <App />
    </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>
);
