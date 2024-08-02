import React, { useState } from 'react';
import styled from 'styled-components';
import { Button as AntButton, Layout as AntLayout, Menu as AntMenu } from 'antd';
import Navbar from '../../component/Organizer/Navbar';
import CreateNewsForm from '../../component/Organizer/CreateNewsForm';
import NewsList from '../../component/Organizer/NewsList';

const { Sider: AntSider, Content: AntContent } = AntLayout;

const CustomButton = styled(AntButton)`
  background-color: #EC6C21;
  border-color: #EC6C21;

  &:hover {
    background-color: #81360b !important;
    border-color: #81360b !important;
  }
`;

const Sider = styled(AntSider)`
  background-color: #EC6C21;
`;

const Menu = styled(AntMenu)`
  .ant-menu-item-selected {
    background-color: #d55a1a !important;
    color: white !important;
  }
`;

const Content = styled(AntContent)`
  background-color: #fff;
  padding: 24px;
  margin: 0;
  min-height: 280px;
`;

const NewsManage = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <>
      <Navbar />
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
            onClick={(e) => setSelectedKey(e.key)}
          >
            <Menu.Item key="1">Tạo tin tức</Menu.Item>
            <Menu.Item key="2">Tin tức đã tạo</Menu.Item>
          </Menu>
        </Sider>
        <AntLayout style={{ padding: '0 24px 24px' }}>
          <Content>
            {selectedKey === '1' && <CreateNewsForm />}
            {selectedKey === '2' && <NewsList />}
          </Content>
        </AntLayout>
      </AntLayout>
    </>
  );
};

export default NewsManage;