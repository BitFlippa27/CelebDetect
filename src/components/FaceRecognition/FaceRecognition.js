const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2 ">
        <img className="br3" src={imageUrl} alt="" width={"300px"} height="auto"/>
      </div>
    </div>
  )
}

export default FaceRecognition;