import React from 'react';
import { Card, Table, Tag, Space, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ChemicalHazard {
  id: string;
  name: string;
  location: string;
  hazard_type: string[];
  storage_condition: string;
  status: 'normal' | 'warning' | 'critical';
  last_checked: string;
}

const ChemicalHazards: React.FC = () => {
  const columns: ColumnsType<ChemicalHazard> = [
    {
      title: 'Chemical',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <span>{text}</span>
          <Badge 
            status={
              record.status === 'normal' ? 'success' :
              record.status === 'warning' ? 'warning' : 'error'
            } 
          />
        </Space>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Hazards',
      key: 'hazards',
      dataIndex: 'hazard_type',
      render: (hazards: string[]) => (
        <>
          {hazards.map(hazard => {
            const color = 
              hazard === 'Corrosive' ? 'volcano' :
              hazard === 'Toxic' ? 'red' :
              hazard === 'Flammable' ? 'orange' : 'blue';
            return (
              <Tag color={color} key={hazard}>
                {hazard}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Storage',
      dataIndex: 'storage_condition',
      key: 'storage',
    },
  ];

  const data: ChemicalHazard[] = [
    {
      id: '1',
      name: 'Hydrochloric Acid',
      location: 'Cabinet A-1',
      hazard_type: ['Corrosive'],
      storage_condition: '15-25°C',
      status: 'normal',
      last_checked: '2024-03-10T10:00:00Z',
    },
    {
      id: '2',
      name: 'Methanol',
      location: 'Cabinet B-2',
      hazard_type: ['Flammable', 'Toxic'],
      storage_condition: '15-25°C',
      status: 'warning',
      last_checked: '2024-03-10T10:00:00Z',
    },
  ];

  return (
    <Card title="Chemical Hazards Monitor">
      <Table 
        columns={columns} 
        dataSource={data}
        rowKey="id"
        size="small"
        pagination={false}
      />
    </Card>
  );
};

export default ChemicalHazards; 