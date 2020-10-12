import React from "react";
import { Modal, Button } from "react-bootstrap";

const Message = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.onHide}>
          New Game
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Message;
