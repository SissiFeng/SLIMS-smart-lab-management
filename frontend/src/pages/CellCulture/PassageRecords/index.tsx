import React, { useState } from 'react';
import { Card, Table, Button, Space, Select, DatePicker, Tag, Modal, Row, Col } from 'antd';
import { PlusOutlined, WarningOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import AddPassageModal from './components/AddPassageModal';
import PassageDetailDrawer from './components/PassageDetailDrawer';
import './index.scss';

interface PassageRecord {
  id: string;
  cell_line_id: string;
  cell_line_name: string;
  passage_number: number;
  date: string;
  split_ratio: string;
  confluence: number;
  viability: number;
  cell_count: number;
  morphology: 'Normal' | 'Abnormal' | 'Mixed';
  growth_status: 'Good' | 'Fair' | 'Poor';
  media_type: string;
  media_lot: string;
  performed_by: string;
  notes: string;
  images?: string[];
  next_passage_due?: string;
  alerts?: string[];
}

const PassageRecords: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PassageRecord | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const columns: ColumnsType<PassageRecord> = [
    {
      title: 'Cell Line',
      dataIndex: 'cell_line_name',
      key: 'cell_line_name',
      sorter: true,
    },
    {
      title: 'Passage #',
      dataIndex: 'passage_number',
      key: 'passage_number',
      sorter: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
    },
    {
      title: 'Confluence',
      dataIndex: 'confluence',
      key: 'confluence',
      render: (confluence: number) => `${confluence}%`,
    },
    {
      title: 'Viability',
      dataIndex: 'viability',
      key: 'viability',
      render: (viability: number) => (
        <Tag color={viability > 90 ? 'green' : viability > 80 ? 'orange' : 'red'}>
          {viability}%
        </Tag>
      ),
    },
    {
      title: 'Growth Status',
      dataIndex: 'growth_status',
      key: 'growth_status',
      render: (status: string) => (
        <Tag color={
          status === 'Good' ? 'green' : 
          status === 'Fair' ? 'orange' : 'red'
        }>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Next Passage',
      dataIndex: 'next_passage_due',
      key: 'next_passage_due',
      render: (date: string, record: PassageRecord) => (
        <Space>
          {date}
          {record.alerts?.length ? (
            <WarningOutlined style={{ color: '#faad14' }} />
          ) : null}
        </Space>
      ),
    }
  ];

  const mockData: PassageRecord[] = [
    {
      id: '1',
      cell_line_id: 'CL001',
      cell_line_name: 'HEK293T',
      passage_number: 15,
      date: '2024-03-15',
      split_ratio: '1:6',
      confluence: 90,
      viability: 95,
      cell_count: 2.5e6,
      morphology: 'Normal',
      growth_status: 'Good',
      media_type: 'DMEM + 10% FBS',
      media_lot: 'ML001',
      performed_by: 'John Doe',
      notes: 'Cells looking healthy',
      next_passage_due: '2024-03-18'
    },
    {
      id: '2',
      cell_line_id: 'CL002',
      cell_line_name: 'Jurkat',
      passage_number: 8,
      date: '2024-03-14',
      split_ratio: '1:4',
      confluence: 85,
      viability: 92,
      cell_count: 1.8e6,
      morphology: 'Normal',
      growth_status: 'Good',
      media_type: 'RPMI + 10% FBS',
      media_lot: 'ML002',
      performed_by: 'Jane Smith',
      notes: 'Standard passage',
      next_passage_due: '2024-03-17'
    }
  ];

  return (
    <div className="passage-records-page">
      <Card title="Passage Records">
        <Row gutter={[16, 16]} className="filter-row">
          <Col span={6}>
            <Select placeholder="Select Cell Line" style={{ width: '100%' }}>
              <Select.Option value="all">All Cell Lines</Select.Option>
              <Select.Option value="HEK293T">HEK293T</Select.Option>
              <Select.Option value="Jurkat">Jurkat</Select.Option>
            </Select>
          </Col>
          <Col span={6}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Col>
          <Col span={4}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              New Passage
            </Button>
          </Col>
        </Row>
        
        <Table 
          columns={columns}
          dataSource={mockData}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              setSelectedRecord(record);
              setDrawerVisible(true);
            }
          })}
        />
      </Card>

      <AddPassageModal 
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <PassageDetailDrawer
        visible={drawerVisible}
        record={selectedRecord}
        onClose={() => {
          setDrawerVisible(false);
          setSelectedRecord(null);
        }}
      />
    </div>
  );
};

export default PassageRecords; 