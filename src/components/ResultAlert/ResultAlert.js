import React from "react";
import Alert from 'react-bootstrap/Alert';

const ResultAlert = ({celebrities}) => {

  console.log(celebrities);
  if(celebrities.hasOwnProperty("result1")) {
    return (
    <Alert variant="success">
      <Alert.Heading>Congrats the AI detected the face !</Alert.Heading>
      <p>
        aklsöjdöalskdjlksajalksjd
      </p>
      <hr />
      <p className="mb-0">
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </Alert>
    )
  }
  return;
  
}

export default ResultAlert;