import React from "react";
import "./ImageLinkForm.css";


const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div className="mt5">
      <p className="f3 b white "> 
      Paste an URL to an image in the form below click detect and see your amazing results !
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input 
            onChange={onInputChange} 
            className="f4 pa2 w-70 center br3" type="text"  />
          <button 
            onClick={onPictureSubmit} 
            className="w-30 grow link ph3 pv2 dib bg-light-purple br2 sega"><span>Detect</span></button>
        </div>
      </div>
    </div>
  );
}


export default ImageLinkForm;