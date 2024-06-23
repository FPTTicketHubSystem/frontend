import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../assets/css/button.css';

const ConfirmButton = ({ onRemove }) => {
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true); // Set isConfirmed to true when confirmed
    setShowModal(false); // Close the modal after confirmation
    // Perform further logic, e.g., call onRemove() to remove user
  };

  return (
    <>
      {!isConfirmed && (
        <button
          onClick={() => setShowModal(true)}
          className="btn-tooltip btn btn-outline-success btn-sm"
          title="Duyệt"
        >
          <i className="icon-check1"></i>
        </button>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận duyệt người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn duyệt người dùng này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Không
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmButton;
