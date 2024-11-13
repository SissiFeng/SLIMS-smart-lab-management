import React from 'react';
import { Card, Row, Col, Select, Table, Tag, Statistic } from 'antd';
import { Pie, Column } from '@ant-design/plots';
import { ExperimentOutlined, AlertOutlined } from '@ant-design/icons';
import './index.scss';

const CellStatistics: React.FC = () => {
  // 细胞系分布数据
  const distributionData = [
    { type: 'Adherent', value: 25 },
    { type: 'Suspension', value: 15 },
    { type: 'Mixed', value: 8 },
  ];

  // 传代成功率数据
  const passageData = [
    { month: '2024-01', success: 95, total: 100 },
    { month: '2024-02', success: 92, total: 98 },
    { month: '2024-03', success: 97, total: 100 },
  ];

  const columns = [
    {
      title: 'Cell Line',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current Passage',
      dataIndex: 'passage',
      key: 'passage',
    },
    {
      title: 'Viability',
      dataIndex: 'viability',
      key: 'viability',
      render: (viability: number) => (
        <Tag color={viability < 85 ? 'red' : viability < 90 ? 'orange' : 'green'}>
          {viability}%
        </Tag>
      ),
    },
    {
      title: 'Growth Rate',
      dataIndex: 'growth',
      key: 'growth',
      render: (growth: string) => (
        <Tag color={growth === 'Normal' ? 'green' : 'orange'}>
          {growth}
        </Tag>
      ),
    },
  ];

  return (
    <div className="cell-statistics">
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Active Cell Lines"
              value={48}
              prefix={<ExperimentOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Passage Success Rate"
              value={96.5}
              suffix="%"
              precision={1}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Average Viability"
              value={92.8}
              suffix="%"
              precision={1}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Growth Issues"
              value={3}
              prefix={<AlertOutlined />}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Cell Line Distribution">
            <Pie {...{
              data: distributionData,
              angleField: 'value',
              colorField: 'type',
              radius: 0.8,
              label: {
                type: 'outer',
              },
            }} />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Passage Success Rate Trend">
            <Column {...{
              data: passageData,
              xField: 'month',
              yField: 'success',
              label: {
                position: 'top',
              },
            }} />
          </Card>
        </Col>

        <Col span={24}>
          <Card title="Cell Line Performance">
            <Table 
              dataSource={[
                { key: '1', name: 'HEK293T', passage: 'P25', viability: 95, growth: 'Normal' },
                { key: '2', name: 'Jurkat', passage: 'P12', viability: 88, growth: 'Slow' },
                { key: '3', name: 'MCF7', passage: 'P18', viability: 92, growth: 'Normal' },
              ]} 
              columns={columns} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CellStatistics; 