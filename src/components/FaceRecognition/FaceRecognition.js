import React from "react";
import "./FaceRecognition.css";
import BoundingBox from "../BoundingBox/BoundingBox";


const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2 ">
        <img id="input-image" className="br3"  src={imageUrl} alt="" width={"500px"} height="auto"/>
        {boxes.map((box,i) => <BoundingBox box={box} key={i}/>)}
      </div>
    </div>
  )
}

export default FaceRecognition;