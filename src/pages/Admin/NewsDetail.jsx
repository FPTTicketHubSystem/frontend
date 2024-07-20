import { Button, Card, Col, notification, Row, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../component/Admin/Header";
import Navbar from "../../component/Admin/Navbar";
import { UserContext } from "../../context/UserContext";
import {
  ChangeStatusNewsService,
  GetNewsDetailService,
} from "../../services/NewsService";

const CustomButton = styled(Button)`
  background-color: #ec6c21;
  border-color: #ec6c21;

  &:hover {
    background-color: #81360b !important;
    border-color: #81360b !important;
  }
`;

// const ContentFigure = styled.figure`
//   margin: 20px 0;
//   text-align: center;

//   img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

// const ContentParagraph = styled.p`
//   font-size: 16px;
//   line-height: 1.6;
//   color: #333;
//   margin-bottom: 15px;
// `;

const ContentWrapper = styled.div`
  font-family: "Roboto", sans-serif;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    max-width: 560px;
    height: 315px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Function to replace <oembed> with <iframe>
const transformContent = (content) => {
  return content.replace(
    /<oembed url="https:\/\/www\.youtube\.com\/watch\?v=([^"]+)"><\/oembed>/g,
    (match, videoId) => {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    }
  );
};

export default function NewsDetail() {
  const { user, render, onSetRender } = useContext(UserContext);
  const [newsDetail, setNewsDetail] = useState(null);
  const { newsId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      const result = await GetNewsDetailService(newsId);
      if (result) {
        result.content = transformContent(result.content); // Transform content before setting it
        setNewsDetail(result);
      }
    };

    fetchNewsDetail();
  }, [newsId, render]);

  const handleStatusChange = async (status) => {
    const result = await ChangeStatusNewsService(newsId, status);
    if (result.status === 200) {
      notification.success({
        message: "Thành công",
        description: "Thao tác thành công",
        placement: "topRight",
      });
      onSetRender();
      navigate("/manage-news");
    }
  };

  if (!newsDetail) {
    return <Spin size="large" />;
  }

  const columns = [
    {
      title: "Thuộc tính",
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
      key: "detail",
    },
  ];

  const data = [
    {
      key: "1",
      attribute: "Tiêu đề",
      detail: newsDetail.title,
    },
    {
      key: "2",
      attribute: "Tác giả",
      detail: newsDetail.fullName,
    },
    {
      key: "3",
      attribute: "Ngày tạo",
      detail: `${new Date(
        newsDetail.createDate
      ).toLocaleDateString()} ${new Date(
        newsDetail.createDate
      ).toLocaleTimeString()}`,
    },
    {
      key: "4",
      attribute: "Trạng thái",
      detail: newsDetail.status === "Đã duyệt" ? "Đã duyệt" : "Chưa duyệt",
    },
    {
      key: "5",
      attribute: "Nội dung",
      detail: (
        <ContentWrapper
          dangerouslySetInnerHTML={{ __html: newsDetail.content }}
        />
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="app-container">
        <div className="app-header d-flex align-items-center">
          <Header />
        </div>

        <Navbar />

        <div className="app-body">
          <div className="container">
            <div className="row">
              <div className="col-12 col-xl-12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <i className="icon-home lh-1"></i>
                      <a href="/" className="text-decoration-none">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/manage-news" className="text-decoration-none">
                        Manage News
                      </a>
                    </li>
                    <li className="breadcrumb-item text-light">News Detail</li>
                  </ol>
                </div>

                <Card>
                  <Row>
                    <Col span={24}>
                      <img
                        src={newsDetail.coverImage}
                        alt="Cover"
                        style={{ width: "100%", marginBottom: "20px" }}
                      />
                    </Col>
                    <Col span={24}>
                      <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                      />
                    </Col>
                    <Col span={24} style={{ marginTop: "20px" }}>
                      <CustomButton
                        type="primary"
                        onClick={() => handleStatusChange("Đã duyệt")}
                        disabled={newsDetail.status === "Đã duyệt"}
                        style={{ marginRight: "10px" }}
                      >
                        Duyệt
                      </CustomButton>
                      <CustomButton
                        type="danger"
                        onClick={() => handleStatusChange("Chưa duyệt")}
                        disabled={newsDetail.status === "Chưa duyệt"}
                      >
                        Hủy duyệt
                      </CustomButton>
                      <CustomButton
                        type="default"
                        onClick={() => navigate("/manage-news")}
                        style={{ marginLeft: "10px" }}
                      >
                        Quay lại danh sách
                      </CustomButton>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
