import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Table, Tag } from 'antd';
import { Line, Column } from '@ant-design/plots';
import './index.scss';

const { RangePicker } = DatePicker;

const UsageAnalysis: React.FC = () => {
  const [category, setCategory] = useState('reagents');
  
  // 模拟使用趋势数据
  const trendData = [
    { date: '2024-01', value: 350, category: 'DMEM' },
    { date: '2024-02', value: 400, category: 'DMEM' },
    { date: '2024-03', value: 380, category: 'DMEM' },
    { date: '2024-01', value: 200, category: 'FBS' },
    { date: '2024-02', value: 250, category: 'FBS' },
    { date: '2024-03', value: 220, category: 'FBS' },
  ];

  // 使用量排名数据
  const rankingData = [
    { item: 'DMEM', value: 1130 },
    { item: 'FBS', value: 670 },
    { item: 'Trypsin', value: 420 },
    { item: 'PBS', value: 380 },
  ];

  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Usage (Last 30 Days)',
      dataIndex: 'usage',
      key: 'usage',
      sorter: (a, b) => a.usage - b.usage,
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: number) => (
        <Tag color={trend > 0 ? 'red' : 'green'}>
          {trend > 0 ? `↑${trend}%` : `↓${Math.abs(trend)}%`}
        </Tag>
      ),
    },
    {
      title: 'Stock Level',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <Tag color={stock < 20 ? 'red' : stock < 50 ? 'orange' : 'green'}>
          {stock}%
        </Tag>
      ),
    },
  ];

  return (
    <div className="usage-analysis">
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Usage Trends">
            <Row gutter={[16, 16]} className="filter-row">
              <Col span={6}>
                <Select 
                  value={category}
                  onChange={setCategory}
                  style={{ width: '100%' }}
                >
                  <Select.Option value="reagents">Reagents</Select.Option>
                  <Select.Option value="media">Culture Media</Select.Option>
                  <Select.Option value="consumables">Consumables</Select.Option>
                </Select>
              </Col>
              <Col span={6}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
            </Row>
            <div style={{ height: 400 }}>
              <Line {...{
                data: trendData,
                xField: 'date',
                yField: 'value',
                seriesField: 'category',
                smooth: true,
              }} />
            </div>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Top Usage Items">
            <Column {...{
              data: rankingData,
              xField: 'item',
              yField: 'value',
              label: {
                position: 'top',
              },
            }} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Usage Details">
            <Table 
              dataSource={[
                { key: '1', item: 'DMEM', usage: 380, trend: 12, stock: 45 },
                { key: '2', item: 'FBS', usage: 220, trend: -8, stock: 60 },
                { key: '3', item: 'Trypsin', usage: 150, trend: 5, stock: 15 },
              ]} 
              columns={columns} 
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UsageAnalysis; 