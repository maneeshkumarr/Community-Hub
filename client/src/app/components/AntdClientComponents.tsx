'use client';

import React, { useState } from 'react';
import { Layout, Input, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

interface AntdClientComponentsProps {
  children: React.ReactNode;
  onSearchChange?: (value: string) => void;
}

const menuItems = [
  { key: '1', label: 'Home' },
  { key: '2', label: 'Categories' },
  { key: '3', label: 'Profile' },
];

const AntdClientComponents: React.FC<AntdClientComponentsProps> = ({
  children,
  onSearchChange,
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value); // Notify parent component
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header */}
      <Header
        style={{
          backgroundColor: '#ffffff',
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ margin: 0, color: '#111827', fontSize: '20px', fontWeight: 600 }}>
          Samriddhi Setu
        </h1>
        
      </Header>

      {/* Content */}
      <Content style={{ padding: '24px' }}>{children}</Content>

      {/* Footer */}
      <Footer
        style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e5e7eb',
          padding: '12px 0',
        }}
      >
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{
            display: 'flex',
            justifyContent: 'center',
            borderBottom: 'none',
            backgroundColor: 'transparent',
          }}
        />
      </Footer>
    </Layout>
  );
};

export default AntdClientComponents;
