import React, { useEffect, useState, useContext } from 'react';
import { Card, List, Statistic, Row, Col, Rate, Table } from 'antd';
import { GetEventStatisticsService } from '../../services/EventService';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../../component/Organizer/Navbar";
import Footer from '../../component/Footer';
import { decodeId } from '../../utils/utils';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { GetRateByEventIdService } from '../../services/EventRatingService';
import moment from 'moment';


const EventStatistics = () => {
  const { user } = useContext(UserContext);
  const { encodedId } = useParams();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState(decodeId(encodedId));
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  const fetchStatistics = async () => {
    try {
      const response = await GetEventStatisticsService(eventId);
      console.log('organizerid', response.eventStatus.organizerId)
      console.log('organizerid from context', user?.accountId);
      if (response.eventStatus.organizerId !== user?.accountId) {
        toast.error('Không có quyền truy cập!')
        navigate('/organizer/events');
      }
      setStatistics(response);
    } catch (error) {
      console.error('Error fetching event statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleRatings = [
    {
      eventRatingId: '1',
      accountName: 'Nguyen Van A',
      rating: 4,
      review: 'Sự kiện rất tốt, tổ chức chuyên nghiệp.',
      ratingDate: '2024-08-20',
    },
    {
      eventRatingId: '2',
      accountName: 'Tran Thi B',
      rating: 5,
      review: 'Tuyệt vời! Tôi rất hài lòng với sự kiện này.',
      ratingDate: '2024-08-21',
    },
    {
      eventRatingId: '3',
      accountName: 'Le Van C',
      rating: 3,
      review: 'Sự kiện ổn nhưng có thể cải thiện nhiều hơn.',
      ratingDate: '2024-08-22',
    },
    {
      eventRatingId: '4',
      accountName: 'Phan Thi D',
      rating: 4,
      review: 'Rất vui vì đã tham gia, không khí tốt.',
      ratingDate: '2024-08-23',
    },
    {
      eventRatingId: '5',
      accountName: 'Hoang Van E',
      rating: 2,
      review: 'Không như mong đợi, cần nhiều cải thiện.',
      ratingDate: '2024-08-23',
    },
  ];

  const fetchRatings = async () => {
    try {
      const response = await GetRateByEventIdService(eventId);
      if (response.status === 200) {
        const activeRatings = response.ratings.filter(rating => rating.status.trim() === 'Active');
        setRatings(activeRatings.length > 0 ? activeRatings : sampleRatings);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  useEffect(() => {
    console.log('useeffect was called');
    if (!user.accountId) {
      console.error('accountid', user.accountId);
      //setLoading(false);
      return;
    }
    try {
      fetchStatistics();
      fetchRatings();
    }
    catch (e) {
      console.error('error', e);
    }
  }, [eventId, user.accountId]);

  const columns = [
    {
      title: 'Tên người đánh giá',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'Điểm đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <Rate disabled value={text} />,
    },
    {
      title: 'Nhận xét',
      dataIndex: 'review',
      key: 'review',
    },
    {
      title: 'Ngày đánh giá',
      dataIndex: 'ratingDate',
      key: 'ratingDate',
      render: (text) => moment(text).local().format('DD/MM/YYYY HH:mm'),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Card
        title={<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Thống kê cho sự kiện: {statistics.eventStatus.eventName}</span>}
      >
        <Row gutter={16} className='mb-3'>
          <Col span={8}>
            <Statistic title="Trạng thái" value={statistics.eventStatus.eventStatus} />
          </Col>
          <Col span={8}>
            <Statistic title="Số vé đã cung cấp" value={statistics.numOfTicketSold} />
          </Col>
          <Col span={8}>
            <Statistic title="Tổng doanh thu (VND)" value={statistics.totalRevenue} />
          </Col>
          {statistics.eventStatus.eventStatus === "Đã kết thúc" && (
            <>
              <Col span={8}>
                <Statistic title="Người tham dự thực tế" value={statistics.actualParticipants} />
              </Col>
              <Col span={8}>
                <div style={{ marginTop: 16 }}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Đánh giá trung bình: </span>
                  <Rate disabled value={statistics.eventRating.averageRating} />
                  <span style={{ marginLeft: 8 }}>({statistics.eventRating.ratingCount} đánh giá)</span>
                </div>
              </Col>
            </>
          )}
        </Row>
        <List
          header={<div>Số vé đã cung cấp theo loại vé</div>}
          bordered
          dataSource={statistics.ticketSalesPerTicketType}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`Loại vé: ${item.ticketType}`}
                description={`Số vé cung cấp: ${item.numberOfTicketsSold}`}
              />
            </List.Item>
          )}
        />
        <List
          className='mt-3'
          header={<div>Số lượng vé còn lại</div>}
          bordered
          dataSource={statistics.ticketSalesPerTicketType}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`Loại vé: ${item.ticketType}`}
                description={`Số lượng: ${item.remainingTickets}`}
              />
            </List.Item>
          )}
        />
        {statistics.eventStatus.eventStatus === "Đã kết thúc" && (
          <>
            <p className='mt-3'>Đánh giá chi tiết:</p>
            <Table
              columns={columns}
              dataSource={ratings}
              pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15'] }}
              rowKey="eventRatingId"
              className="mt-3"
            />
          </>
        )}
      </Card>
      <Footer />
    </>
  );
};

export default EventStatistics;