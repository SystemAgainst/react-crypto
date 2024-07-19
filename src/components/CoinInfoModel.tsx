import { Crypto } from '../types/ICrypto.ts';
import React from 'react';

interface CoinInfoModelProps {
  coin: Crypto | null;
}

const CoinInfoModel: React.FC<CoinInfoModelProps> = ({ coin }) => {
  return (
    <>
      <h2>{coin?.name}</h2>
    </>
  );
};

export default CoinInfoModel;
