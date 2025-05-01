'use client';

import React from 'react';
import { Layout, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

interface AntdClientComponentsProps {
  children: React.ReactNode;
}

const menuItems = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'Categories' },
  { key: '3', label: 'Profile' },
];

const AntdClientComponents: React.FC<AntdClientComponentsProps> = ({ children }) => {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0070f3', color: '#fff' }}>
        <h1 style={{ color: '#fff', margin: 0 }}>Samriddhi Setu</h1>
        <Input
          placeholder="Search posts..."
          prefix={<SearchOutlined />}
          style={{ width: 300 }}
        />
      </Header>
      <Content style={{ padding: '20px' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>
        <Menu mode="horizontal" style={{ justifyContent: 'center' }} items={menuItems} />
      </Footer>
    </Layout>
  );
};

export default AntdClientComponents;