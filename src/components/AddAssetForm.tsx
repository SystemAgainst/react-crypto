import { useState } from 'react';
import { Crypto } from '../types/ICrypto.ts';
import { Select, Space, Typography } from 'antd';
import { useCrypto } from '../context/crypto-context.tsx';
import CoinInfo from './CoinInfo.tsx';

const AddAssetForm = () => {
  const [coin, setCoin] = useState<Crypto | null>(null);
  const { crypto } = useCrypto();

  const handleSelect = (value: string) => {
    const selectedCoin = crypto.find((c) => c.id === value);

    if (!selectedCoin) {
      return setCoin(null);
    }

    setCoin(selectedCoin);
  };

  if (!coin) {
    return (
      <>
        <Select
          style={{ width: '100%' }}
          placeholder="Select coin"
          onSelect={handleSelect}
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
      </>
    );
  }

  return (
    <>
      <form>
        <CoinInfo coin={coin} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </form>
    </>
  );
};

export default AddAssetForm;
