import React, { useState } from 'react';
import { Card, Form, Input, Button, Row, Col, Table, Tag, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.scss';

const { TextArea } = Input;
const { Option } = Select;

interface PrimerRecord {
  key: string;
  name: string;
  sequence: string;
  length: number;
  tm: number;
  gc: number;
  purpose: string;
}

const PrimerDesign: React.FC = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sequence (5\' → 3\')',
      dataIndex: 'sequence',
      key: 'sequence',
      render: (text: string) => <code>{text}</code>,
    },
    {
      title: 'Length',
      dataIndex: 'length',
      key: 'length',
    },
    {
      title: 'Tm (°C)',
      dataIndex: 'tm',
      key: 'tm',
    },
    {
      title: 'GC Content',
      dataIndex: 'gc',
      key: 'gc',
      render: (gc: number) => (
        <Tag color={gc < 40 || gc > 60 ? 'orange' : 'green'}>
          {gc}%
        </Tag>
      ),
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
  ];

  const mockData: PrimerRecord[] = [
    {
      key: '1',
      name: 'GFP_F',
      sequence: 'ATGGTGAGCAAGGGCGAGG',
      length: 19,
      tm: 62.3,
      gc: 58,
      purpose: 'GFP amplification',
    },
    {
      key: '2',
      name: 'GFP_R',
      sequence: 'TTACTTGTACAGCTCGTCCATG',
      length: 22,
      tm: 58.6,
      gc: 45,
      purpose: 'GFP amplification',
    },
  ];

  const handleDesign = (values: any) => {
    console.log('Design values:', values);
    // 实现引物设计逻辑
  };

  return (
    <div className="primer-design-page">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Design New Primer">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleDesign}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Template Sequence"
                    name="template"
                    rules={[{ required: true, message: 'Please input template sequence' }]}
                  >
                    <TextArea rows={4} placeholder="Enter DNA sequence" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Parameters">
                    <Row gutter={[8, 8]}>
                      <Col span={12}>
                        <Form.Item
                          name="lengthRange"
                          label="Length Range"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="18-25" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="tmRange"
                          label="Tm Range"
                          rules={[{ required: true }]}
                        >
                          <Input placeholder="55-65" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item
                      name="gcContent"
                      label="GC Content (%)"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="40-60" />
                    </Form.Item>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Additional Options">
                    <Form.Item
                      name="purpose"
                      label="Purpose"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="e.g., Gene amplification" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                      Design Primers
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Primer List">
            <Table 
              columns={columns} 
              dataSource={mockData}
              pagination={false}
              className="primer-table"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PrimerDesign; 