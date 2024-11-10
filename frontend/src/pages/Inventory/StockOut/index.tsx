// src/pages/Inventory/StockOut/index.tsx
import React from 'react';
import { Form, InputNumber, Select, Button, Card, Space, Input } from 'antd';
import './index.scss';

const { Option } = Select;

const StockOut: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div className="stock-out">
      <Card title="Stock Out">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="chemical"
            label="Chemical"
            rules={[{ required: true, message: 'Please select a chemical' }]}
          >
            <Select
              showSearch
              placeholder="Select a chemical"
              optionFilterProp="children"
            >
              <Option value="hcl">Hydrochloric Acid</Option>
              <Option value="naoh">Sodium Hydroxide</Option>
              <Option value="h2so4">Sulfuric Acid</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please input quantity' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="unit"
            label="Unit"
            rules={[{ required: true, message: 'Please select unit' }]}
          >
            <Select placeholder="Select unit">
              <Option value="L">Liter (L)</Option>
              <Option value="mL">Milliliter (mL)</Option>
              <Option value="kg">Kilogram (kg)</Option>
              <Option value="g">Gram (g)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="purpose"
            label="Purpose"
            rules={[{ required: true, message: 'Please input purpose' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="requestedBy"
            label="Requested By"
            rules={[{ required: true, message: 'Please input requester name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="remarks"
            label="Remarks"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StockOut;