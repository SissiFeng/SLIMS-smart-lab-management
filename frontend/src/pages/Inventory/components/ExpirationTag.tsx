import React from 'react';
import { Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';

interface ExpirationTagProps {
  expirationDate: string;
  openedDate?: string;
}

const ExpirationTag: React.FC<ExpirationTagProps> = ({ 
  expirationDate, 
  openedDate 
}) => {
  const now = dayjs();
  const expiry = dayjs(expirationDate);
  const daysUntilExpiry = expiry.diff(now, 'day');

  const getColor = () => {
    if (daysUntilExpiry <= 0) return 'error';
    if (daysUntilExpiry <= 30) return 'warning';
    if (daysUntilExpiry <= 90) return 'processing';
    return 'success';
  };

  const getLabel = () => {
    if (daysUntilExpiry <= 0) return 'Expired';
    if (daysUntilExpiry === 1) return '1 day left';
    return `${daysUntilExpiry} days left`;
  };

  return (
    <Tooltip 
      title={openedDate ? `Opened on: ${dayjs(openedDate).format('YYYY-MM-DD')}` : null}
    >
      <Tag color={getColor()}>
        {getLabel()}
      </Tag>
    </Tooltip>
  );
};

export default ExpirationTag; 