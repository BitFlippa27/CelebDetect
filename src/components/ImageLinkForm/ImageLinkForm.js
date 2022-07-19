import React from "react";
import "./ImageLinkForm.css";


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3"> 
      {"This Magic App will detect faces in your Pictures. Try it out !"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input 
            onChange={onInputChange} 
            className="f4 pa2 w-70 center br3" type="text"  />
          <button 
            onClick={onSubmit} 
            className="w-30 grow link ph3 pv2 dib white bg-light-purple br2">Detect</button>
        </div>
      </div>
    </div>
  );
}


export default ImageLinkForm;