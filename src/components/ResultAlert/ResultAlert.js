import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ResultAlert = ({celebrities}) => {
  const [show, setShow] = useState(true);

  console.log(celebrities);
  return (celebrities.hasOwnProperty("result1")) ? (
    <div
    className="modal show"
    style={{ display: 'block', position: 'initial' }}
  >
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>
    </div>
  ) : "";
    
}

export default ResultAlert;