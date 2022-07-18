import React from "react";
import "./Logo.css";
import logo from "./logo3.png";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <div className="Tilt br2 shadow-2 pa3 grow" >
        <img style= {{paddingTop:"3px"}} src={logo} alt="logo" /> 
      </div>
    </div>
  );
}


export default Logo;