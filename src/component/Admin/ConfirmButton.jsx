import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmButon = ({ onRemove }) => {
  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    // Handle confirmation logic, e.g., call onRemove()
    setIsConfirmed(true); // Set isConfirmed to true when confirmed
    setShowModal(false); // Close the modal after confirmation
  };

  return (
    <>
      {!isConfirmed && ( // Render the button only if not confirmed
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-outline-success btn-sm"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-custom-class="custom-tooltip-danger"
          data-bs-title="Duyet"
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

export default ConfirmButon;

