import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import Star from "./Star";
import "./index.css";
// import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /*React.StrictMode make comp intial rendering twice in 
    devlopment not production 
    if we removed it it will give us on output in console 
   */
  <React.StrictMode>
    <App />
    {/* <Star maxRating={5} /> */}
    {/* <Star rating={10} /> */}
  </React.StrictMode>
);
