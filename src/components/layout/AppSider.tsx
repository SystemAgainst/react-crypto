import React, { useContext } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Layout, List, Statistic, Typography, Tag } from 'antd';
import { capitalize } from '../../utlis';
import CryptoContext from '../../context/crypto-context.tsx';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

export function AppSider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} size="small" style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            dataSource={[
              { title: 'Total price', value: asset.totalProfit, withTag: true },
              { title: 'Asset amount', value: asset.amount, isPlane: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{capitalize(item.title)}</span>

                <span>
                  {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercentage}%</Tag>}
                  {item.isPlane && item.value}
                  {!item.isPlane && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value?.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
