import React from 'react';
import { Tag, Tooltip } from 'antd';
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface SyncStatusProps {
  status: 'syncing' | 'success' | 'failed';
  lastSyncTime?: string;
  errorMessage?: string;
}

const SyncStatus: React.FC<SyncStatusProps> = ({ status, lastSyncTime, errorMessage }) => {
  const getStatusTag = () => {
    switch (status) {
      case 'syncing':
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Syncing
          </Tag>
        );
      case 'success':
        return (
          <Tooltip title={`Last synced: ${lastSyncTime}`}>
            <Tag icon={<CheckCircleOutlined />} color="success">
              Synced
            </Tag>
          </Tooltip>
        );
      case 'failed':
        return (
          <Tooltip title={errorMessage}>
            <Tag icon={<CloseCircleOutlined />} color="error">
              Sync Failed
            </Tag>
          </Tooltip>
        );
    }
  };

  return getStatusTag();
};

export default SyncStatus; 