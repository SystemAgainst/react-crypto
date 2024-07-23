import React from 'react';
import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context.tsx';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce<Record<string, number>>((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  const calculateTotalPortfolioValue = (): string => {
    const totalValue = assets
      .map((asset) => asset.amount * (cryptoPriceMap[asset.id] || 0))
      .reduce((acc, v) => acc + v, 0);

    return totalValue.toFixed(2);
  };

  return (
    <>
      <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
          Portfolio: {calculateTotalPortfolioValue()}$
        </Typography.Title>
      </Layout.Content>
    </>
  );
}
