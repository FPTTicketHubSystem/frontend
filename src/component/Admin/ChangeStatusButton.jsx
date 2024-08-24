import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ChangeStatusEventService } from '../../services/EventService';
import '../../assets/css/button.css';

const ChangeStatusButton = ({ eventId, currentStatus, onStatusChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStatusClick = () => {
    setShowModal(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowRejectModal(false);
  };

  const handleConfirmChange = async (newStatus) => {
    setLoading(true);
    try {
      await ChangeStatusEventService(eventId, newStatus);
      onStatusChange(newStatus);
    } catch (error) {
      console.error('Error changing event status:', error);
      alert('Error changing event status. Please try again.');
    } finally {
      setLoading(false);
      setShowModal(false);
      setShowRejectModal(false);
    }
  };

  const getButtonClass = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return 'btn-tooltip btn btn-outline-info btn-sm';
      case 'Đã duyệt':
        return 'btn-tooltip btn btn-outline-danger btn-sm';
      case 'Từ chối':
        return 'btn-tooltip btn btn-outline-warning btn-sm';
      default:
        return 'btn-tooltip btn btn-outline-secondary btn-sm';
    }
  };

  const getButtonIcon = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return 'icon-check-circle';
      case 'Đã duyệt':
        return 'icon-x-circle';
      case 'Từ chối':
        return 'icon-slash';
      default:
        return 'icon-help-circle';
    }
  };

  const getButtonTitle = (status) => {
    switch (status) {
      case 'Chờ duyệt':
        return 'Duyệt';
      case 'Đã duyệt':
        return 'Hủy duyệt';
      case 'Từ chối':
        return 'Từ chối';
      default:
        return 'Thay đổi trạng thái';
    }
  };


  if (currentStatus === 'Từ chối') {
    return null;
  }

  return (
    <>
      {currentStatus === 'Chờ duyệt' && (
        <>
          <button
            className={getButtonClass('Chờ duyệt')}
            title={getButtonTitle('Chờ duyệt')}
            onClick={handleStatusClick}
          >
            <i className={getButtonIcon('Chờ duyệt')}></i>
          </button>
          <button
            className={getButtonClass('Từ chối')}
            title={getButtonTitle('Từ chối')}
            onClick={handleRejectClick}
            style={{ marginLeft: '5px' }}
          >
            <i className={getButtonIcon('Từ chối')}></i>
          </button>
        </>
      )}

      {currentStatus === 'Đã duyệt' && (
        <button
          className={getButtonClass(currentStatus)}
          title={getButtonTitle(currentStatus)}
          onClick={handleStatusClick}
        >
          <i className={getButtonIcon(currentStatus)}></i>
        </button>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentStatus === 'Chờ duyệt'
              ? 'Duyệt Sự kiện'
              : 'Hủy duyệt Sự kiện'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentStatus === 'Chờ duyệt'
            ? 'Bạn có muốn duyệt sự kiện này không?'
            : 'Bạn có muốn hủy duyệt sự kiện này không?'}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              handleConfirmChange(
                currentStatus === 'Chờ duyệt' ? 'Đã duyệt' : 'Chờ duyệt'
              )
            }
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Chấp nhận'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Từ chối Sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn từ chối sự kiện này không?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmChange('Từ chối')}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Từ chối'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangeStatusButton;