import React from "react";

const BoundingBox = ({box}) => {
  return (
    <div className="bounding-box" style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
  )
}

export default BoundingBox;