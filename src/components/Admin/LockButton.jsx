import React from 'react'
import { Modal, Button } from 'react-bootstrap'


const LockButton = ({ isLocked, onLockChange }) => {
  const [showModal, setShowModal] = React.useState(false)

  const handleLockClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleConfirmLock = () => {
    onLockChange(!isLocked)
    setShowModal(false)
  }

  return (
    <>
      <button className="btn btn-outline-warning btn-sm" data-bs-toggle="tooltip"
        data-bs-placement="top" data-bs-custom-class="custom-tooltip-danger"
        data-bs-title="Lock" onClick={handleLockClick}>
        <i className={isLocked ? "icon-unlock" : "icon-lock"}></i>
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận khóa tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn {isLocked ? "mở khóa" : "khóa"} tài khoản này không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Từ chối
          </Button>
          <Button variant="primary" onClick={handleConfirmLock}>
            Chấp nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LockButton
