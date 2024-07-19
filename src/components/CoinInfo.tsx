import { Flex, Typography } from 'antd';
import React from 'react';
import { Crypto } from '../types/ICrypto.ts';

interface CoinInfoProps {
  coin: Crypto | null;
  showSymbol?: boolean;
}

const CoinInfo: React.FC<CoinInfoProps> = ({ coin, showSymbol = false }) => {
  return (
    <>
      <Flex align="center">
        <img src={coin?.icon} alt={coin?.name} style={{ width: 40, marginRight: 10 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {showSymbol && <span>({coin?.symbol})</span>} {coin?.name}
        </Typography.Title>
      </Flex>
    </>
  );
};

export default CoinInfo;
