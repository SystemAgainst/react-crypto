import { Divider, Flex, Tag, Typography } from 'antd';
import { Crypto } from '../types/ICrypto.ts';
import React from 'react';

interface coinInfoModelProps {
  coin: Crypto | null;
}

const coinInfoModel: React.FC<coinInfoModelProps> = ({ coin }) => {
  if (!coin) {
    return <div>No coin selected</div>;
  }

  return (
    <>
      <Flex align="center">
        <img src={coin?.icon} alt={coin?.name} style={{ width: 40, marginRight: 10 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
          {<span>({coin?.symbol})</span>} {coin?.name}
        </Typography.Title>
      </Flex>

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
