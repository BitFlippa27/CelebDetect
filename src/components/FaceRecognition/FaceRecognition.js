import React from "react";
import "./FaceRecognition.css";
  
const BoundingBox = ({box}) => {
  console.log(box)
  return (
    <div className="bounding-box" style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
  )
}

const FaceRecognition = ({ imageUrl, boxes }) => {
  console.log(boxes)
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