import { Button, Layout, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
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
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        return setSelect((prev) => !prev);
      }
    };

    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  const handleSelect = (value) => {
    console.log(value);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: '250px' }}
        value="press / to open"
        onSelect={handleSelect}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
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
