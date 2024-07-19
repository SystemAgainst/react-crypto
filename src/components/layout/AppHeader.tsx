import { Button, Layout, Select, Space } from 'antd';
import React from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';

const headerStyle: React.CSSProperties = {
  width: '100%',
  padding: '1rem',
  height: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const { crypto } = useCrypto();

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: '250px' }}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary">Add asset</Button>
    </Layout.Header>
  );
}
