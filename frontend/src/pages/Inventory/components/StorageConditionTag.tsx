import React from 'react';
import { Tag, Tooltip } from 'antd';

interface StorageConditionTagProps {
  temperature: number;
}

const StorageConditionTag: React.FC<StorageConditionTagProps> = ({ temperature }) => {
  let color = 'default';
  let label = '';

  if (temperature <= -150) {
    color = 'blue';
    label = 'LN2';
  } else if (temperature <= -80) {
    color = 'cyan';
    label = '-80°C';
  } else if (temperature <= -20) {
    color = 'geekblue';
    label = '-20°C';
  } else if (temperature <= 4) {
    color = 'green';
    label = '4°C';
  } else {
    color = 'orange';
    label = 'RT';
  }

  return (
    <Tooltip title={`${temperature}°C`}>
      <Tag color={color}>{label}</Tag>
    </Tooltip>
  );
};

export default StorageConditionTag; 