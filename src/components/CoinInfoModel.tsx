import { Divider, Tag, Typography } from 'antd';
import { Crypto } from '../types/ICrypto.ts';
import React from 'react';
import CoinInfo from './CoinInfo.tsx';

interface coinInfoModelProps {
  coin: Crypto | null;
}

const coinInfoModel: React.FC<coinInfoModelProps> = ({ coin }) => {
  if (!coin) {
    return <div>No coin selected</div>;
  }

  return (
    <>
      <CoinInfo coin={coin} />
      <Divider />

      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin?.priceChange1h}%</Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin?.priceChange1d}%</Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin?.priceChange1w}%</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin?.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin?.priceBtc}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin?.marketCap}$
      </Typography.Paragraph>
      {coin?.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract Address: </Typography.Text>
          {coin?.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default coinInfoModel;
