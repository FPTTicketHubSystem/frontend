import React, { useState, useEffect, useContext } from 'react';
import { Rate, Input, Button, Typography, message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/RateEvent.css';
import Header from '../../component/Header';
import {
  EditEventRatingService,
  GetRatingByRatingIdService,
} from '../../services/EventRatingService';
import { UserContext } from '../../context/UserContext';
import styled from 'styled-components';

const { Title } = Typography;
const { TextArea } = Input;
const CustomButton = styled(Button)`
  background-color: #EC6C21;
  border-color: #EC6C21;

  &:hover {
    background-color: #81360b !important;
    border-color: #81360b !important;
  }
`;

const RateEvent = () => {
  const { ratingid } = useParams();
  const { user, token, onSetRender } = useContext(UserContext);
  const [existingRating, setExistingRating] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingDate, setRatingDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      localStorage.setItem('redirectAfterLogin', `/rate/${ratingid}`);
      message.error('Vui lòng đăng nhập để đánh giá sự kiện');
      navigate('/login');
    } else if (user && user.accountId && ratingid) {
      fetchExistingRating();
    } else {
      //setError('Thiếu thông tin người dùng hoặc ID đánh giá');
      setIsLoading(true);
    }
  }, [token, user, ratingid, navigate]);

  const fetchExistingRating = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const ratingResponse = await GetRatingByRatingIdService(
        ratingid,
        user.accountId
      );
      console.log('Rating info response:', ratingResponse);

      if (ratingResponse.status === 200 && ratingResponse.rating) {
        const ratingData = ratingResponse.rating;
        setExistingRating(ratingData);
        setRatingDate(new Date(ratingData.ratingDate));
      } else if (ratingResponse.status === 200 && !ratingResponse.data) {
        setExistingRating({ eventRatingId: ratingid, rating: 0, review: '' });
        setRatingDate(null);
      } else if (ratingResponse.status === 403) {
        setError('Bạn không có quyền xem đánh giá này.');
        message.error('Bạn không có quyền xem đánh giá này.');
        setTimeout(() => navigate('/'), 3000);
      } else {
        throw new Error('Không thể lấy thông tin đánh giá');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(`Có lỗi xảy ra: ${error.message}`);
      message.error(`Có lỗi xảy ra: ${error.message}`);
      setTimeout(() => navigate('/'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const canEditRating = () => {
    if (!ratingDate) return true; // Nếu chưa có đánh giá, cho phép đánh giá
    const now = new Date();
    const diffHours = (now - ratingDate) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  const handleSubmit = async () => {
    if (!canEditRating()) {
      message.error('Không thể chỉnh sửa đánh giá sau 24 giờ.');
      return;
    }

    if (!existingRating || existingRating.rating === 0) {
      message.error('Vui lòng chọn số sao đánh giá');
      return;
    }

    try {
      const ratingData = {
        eventRatingId: existingRating.eventRatingId,
        eventId: existingRating.eventId,
        accountId: user.accountId,
        rating: existingRating.rating,
        review: existingRating.review,
      };
      console.log('Submitting rating data:', ratingData);

      const response = await EditEventRatingService(ratingData);
      console.log('Edit rating response:', response);

      if (response.status === 200) {
        message.success('Đánh giá đã được gửi thành công');
        onSetRender();
        navigate('/');
      } else {
        message.error(response.message || 'Có lỗi xảy ra khi gửi đánh giá');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      message.error('Có lỗi xảy ra khi gửi đánh giá');
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!existingRating) {
    return <div>Không tìm thấy đánh giá</div>;
  }

  return (
    <div>
      <Header />
      <div className="rate-event-container">
        <div className="rate-event-content">
          <Title level={2}>Đánh giá sự kiện: {existingRating.eventName}</Title>
          {canEditRating() ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <Title level={4}>Rating:</Title>
                <Rate
                  value={existingRating.rating}
                  onChange={(value) =>
                    setExistingRating((prev) => ({
                      ...prev,
                      rating: value,
                    }))
                  }
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Title level={4}>Review:</Title>
                <TextArea
                  rows={4}
                  placeholder="Nhập đánh giá của bạn"
                  value={existingRating.review}
                  onChange={(e) =>
                    setExistingRating((prev) => ({
                      ...prev,
                      review: e.target.value,
                    }))
                  }
                  maxLength={100}
                  showCount
                />
              </div>

              <CustomButton type="primary" onClick={handleSubmit}>
                {existingRating.eventRatingId
                  ? 'Cập nhật đánh giá'
                  : 'Gửi đánh giá'}
              </CustomButton>
            </>
          ) : (
            <p>Bạn không thể chỉnh sửa đánh giá sau 24 giờ.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateEvent;