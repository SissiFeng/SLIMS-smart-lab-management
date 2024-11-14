import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { sciNoteApi } from '@/services/api/scinote';
import SyncStatus from '@/components/SyncStatus';

const ChemicalInventory: React.FC = () => {
  const [syncStatuses, setSyncStatuses] = useState<Record<string, any>>({});

  const handleSyncToSciNote = async (record: ChemicalRecord) => {
    try {
      // 更新同步状态为进行中
      setSyncStatuses(prev => ({
        ...prev,
        [record.id]: { status: 'syncing' }
      }));

      const result = await sciNoteApi.syncChemical(record);
      
      if (result.success) {
        message.success('Successfully synced to SciNote');
        setSyncStatuses(prev => ({
          ...prev,
          [record.id]: {
            status: 'success',
            lastSyncTime: new Date().toISOString()
          }
        }));
      } else {
        message.error('Failed to sync with SciNote');
        setSyncStatuses(prev => ({
          ...prev,
          [record.id]: {
            status: 'failed',
            errorMessage: result.error
          }
        }));
      }
    } catch (error) {
      message.error('Error syncing with SciNote');
      setSyncStatuses(prev => ({
        ...prev,
        [record.id]: {
          status: 'failed',
          errorMessage: 'Network error'
        }
      }));
    }
  };

  const columns = [
    // ... 其他列
    {
      title: 'Sync Status',
      key: 'syncStatus',
      render: (_, record) => (
        <Space>
          <SyncStatus {...syncStatuses[record.id]} />
          <Button
            icon={<SyncOutlined />}
            onClick={() => handleSyncToSciNote(record)}
            loading={syncStatuses[record.id]?.status === 'syncing'}
          >
            Sync
          </Button>
        </Space>
      ),
    }
  ];

  return (
    <Table
      columns={columns}
      // ... 其他属性
    />
  );
};

export default ChemicalInventory; 