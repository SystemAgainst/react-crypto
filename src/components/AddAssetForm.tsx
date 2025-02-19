import React, { useRef, useState } from 'react';
import { Crypto } from '../types/ICrypto.ts';
import { Button, DatePicker, Divider, Form, FormProps, InputNumber, Result, Select, Space } from 'antd';
import { useCrypto } from '../context/crypto-context.tsx';
import CoinInfo from './CoinInfo.tsx';
import { IAsset } from '../types';
import { Dayjs } from 'dayjs';

interface AddAssetFormProps {
  onClose: () => void;
}

const AddAssetForm: React.FC<AddAssetFormProps> = ({ onClose }) => {
  const [form] = Form.useForm();

  const { crypto, addAsset } = useCrypto();

  const [coin, setCoin] = useState<Crypto | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const assetRef = useRef<{
    id: string;
    amount: number;
    price: number;
    date: Dayjs;
  } | null>(null);

  const handleSelect = (value: string) => {
    const selectedCoin = crypto.find((c) => c.id === value);

    if (!selectedCoin) {
      return setCoin(null);
    }

    setCoin(selectedCoin);
  };

  type FieldType = {
    amount: number;
    price: number;
    date: Dayjs;
    total: number;
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} in not valid number',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (!coin) {
      return;
    }

    console.log('Success. Finish :', values);

    const newAsset: IAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date.$d ?? new Date(),
    };

    assetRef.current = newAsset;

    setSubmitted(true);

    if (addAsset) {
      addAsset(newAsset);
    }
  };

  const handleAmountChange = (value: number | null) => {
    if (value === null) return;

    const price = form.getFieldValue('price');

    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handlePriceChange = (value: number | null) => {
    if (value === null) return;

    const amount = form.getFieldValue('amount');

    form.setFieldsValue({
      price: +(value * amount).toFixed(2),
    });
  };

  if (submitted) {
    return (
      <>
        <Result
          status="success"
          title="Successfully added new asset!"
          subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} by price ${assetRef.current?.price}`}
          extra={[
            <Button type="primary" key="console" onClick={onClose}>
              Close
            </Button>,
          ]}
        />
      </>
    );
  }

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
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          price: +coin.price.toFixed(2),
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <CoinInfo coin={coin} />
        <Divider />

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: 'number',
              min: 0,
            },
          ]}
        >
          <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssetForm;
