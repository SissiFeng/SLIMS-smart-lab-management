import React from 'react';
import { Card, Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface AccessLog {
  id: string;
  personnel: string;
  access_time: string;
  exit_time?: string;
  area: string;
  purpose: string;
  status: 'active' | 'completed';
}

const AccessLogs: React.FC = () => {
  const columns: ColumnsType<AccessLog> = [
    {
      title: 'Personnel',
      dataIndex: 'personnel',
      key: 'personnel',
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Access Time',
      dataIndex: 'access_time',
      key: 'access_time',
    },
    {
      title: 'Exit Time',
      dataIndex: 'exit_time',
      key: 'exit_time',
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const data: AccessLog[] = [
    {
      id: '1',
      personnel: 'John Doe',
      access_time: '2024-03-10 09:00',
      area: 'BSL-2 Lab',
      purpose: 'Cell Culture',
      status: 'active',
    },
    {
      id: '2',
      personnel: 'Jane Smith',
      access_time: '2024-03-10 08:30',
      exit_time: '2024-03-10 09:30',
      area: 'BSL-2 Lab',
      purpose: 'Sample Collection',
      status: 'completed',
    },
  ];

  return (
    <Card title="Access Logs">
      <Table 
        columns={columns} 
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default AccessLogs; 