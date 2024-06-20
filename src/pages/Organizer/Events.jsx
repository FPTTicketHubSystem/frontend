import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Navbar from "../../component/Organizer/Navbar";
import { UserContext } from '../../context/UserContext';
import { Input, Segmented, Table, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { GetEventsService, GetEventByAccountService } from '../../services/EventService';
import Footer from '../../component/Footer';

const { Search } = Input;

const CustomSearch = styled(Input)`
  .ant-btn-primary {
    background-color: #EC6C21;
    border-color: #EC6C21;

    &:hover, 
    &:focus {
      background-color: #EC6C21 !important;
      border-color: #EC6C21 !important;
      opacity: 0.8;
    }
  }
`;

const CustomButton = styled(Button)`
  background-color: #EC6C21;
  border-color: #EC6C21;

  &:hover {
    background-color: #81360b !important;
    border-color: #81360b !important;
  }
`;

const CustomSegmented = styled(Segmented)`
  .ant-segmented-item {
    &:hover {
      opacity: 0.8;
      color: white;
    }
    &.ant-segmented-item-selected {
      background-color: #EC6C21;
      color: white;
    }
  }
`;

const Events = () => {
    const { user } = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('TẤT CẢ');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await GetEventByAccountService(user.accountId);
                //const filteredEvents = response.filter(event => event.accountId === user.accountId);
                setEvents(response);
                setFilteredEvents(response);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user.accountId]);

    useEffect(() => {
        filterEvents(filter, search);
    }, [events, filter, search]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        filterEvents(filter, value);
    };

    const handleSegmentedChange = (value) => {
        setFilter(value);
        filterEvents(value, search);
    };

    const filterEvents = (filter, search) => {
        const now = new Date();
        let filtered = events;

        if (filter === 'SẮP DIỄN RA') {
            filtered = filtered.filter(event => new Date(event.startTime) > now);
        } else if (filter === 'ĐÃ QUA') {
            filtered = filtered.filter(event => new Date(event.endTime) < now);
        } else if (filter === 'CHỜ DUYỆT') {
            filtered = filtered.filter(event => event.status === 'Chờ duyệt');
        } else if (filter === 'NHÁP') {
            filtered = filtered.filter(event => event.status === 'Nháp');
        }

        if (search) {
            filtered = filtered.filter(event => event.eventName.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredEvents(filtered);
    };

    const columns = [
        {
            title: 'Tên sự kiện',
            dataIndex: 'eventName',
            key: 'eventName',
        },
        {
            title: 'Ảnh nền sự kiện',
            dataIndex: 'themeImage',
            key: 'themeImage',
            render: (text) => <img src={text} alt="ThemeImage" style={{ width: '120px', height: 'auto', borderRadius: '10px' }} />,
            responsive: ['md'],
        },
        {
            title: 'Loại sự kiện',
            dataIndex: 'categoryName',
            key: 'categoryName',
            responsive: ['md'],
        },
        {
            title: 'Tên địa điểm',
            dataIndex: 'location',
            key: 'location',
            responsive: ['md'],
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text) => new Date(text).toLocaleString("vi"),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text) => new Date(text).toLocaleString("vi"),
            responsive: ['md'],
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <CustomButton type="primary">
                    <i className="bi bi-pen"></i>
                </CustomButton>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <div className="p-4 bg-light">
                <div className="row align-items-center mb-4">
                    <div className="col-md-8 mb-3 mb-md-0">
                        <CustomSearch
                            placeholder="Tìm kiếm sự kiện"
                            allowClear
                            size="large"
                            style={{ width: '100%' }}
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="col-md-4">
                        <CustomSegmented
                            options={user.userId === 3 ? ['TẤT CẢ', 'SẮP DIỄN RA', 'ĐÃ QUA', 'NHÁP'] : ['TẤT CẢ', 'SẮP DIỄN RA', 'ĐÃ QUA', 'CHỜ DUYỆT', 'NHÁP']}
                            style={{ width: '100%' }}
                            onChange={handleSegmentedChange}
                            value={filter}
                        />
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredEvents}
                    rowKey="eventId"
                    loading={loading}
                />
            </div>
            <Footer/>
        </>
    );
};

export default Events;