import { Button, Layout, Modal, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import CoinInfoModel from '../CoinInfoModel.tsx';
import { Crypto } from '../../types/ICrypto.ts';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coin, setCoin] = useState<Crypto | null>(null);
  const { crypto } = useCrypto();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (value: string) => {
    console.log(value);
    const selectedCoin = crypto.find((c) => c.id === value);

    if (!selectedCoin) {
      return setCoin(null);
    }

    setCoin(selectedCoin);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        return setSelect((prev) => !prev);
      }
    };

    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  return (
    <>
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

        <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
          <CoinInfoModel coin={coin} />
        </Modal>
      </Layout.Header>
    </>
  );
}
