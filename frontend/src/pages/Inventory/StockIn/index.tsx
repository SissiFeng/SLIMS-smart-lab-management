import React from 'react';
import { Form, Input, InputNumber, Select, Button, Card, Space, DatePicker } from 'antd';
import './index.scss';

const { Option } = Select;

const StockIn: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div className="stock-in">
      <Card title="Stock In">
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
            name="batchNumber"
            label="Batch Number"
            rules={[{ required: true, message: 'Please input batch number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true, message: 'Please select expiry date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="location"
            label="Storage Location"
            rules={[{ required: true, message: 'Please select storage location' }]}
          >
            <Select placeholder="Select storage location">
              <Option value="cabinet-a1">Cabinet A-1</Option>
              <Option value="cabinet-a2">Cabinet A-2</Option>
              <Option value="cabinet-b1">Cabinet B-1</Option>
            </Select>
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

export default StockIn;
