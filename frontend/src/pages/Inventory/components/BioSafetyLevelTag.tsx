import React from 'react';
import { Tag, Tooltip } from 'antd';

interface BioSafetyLevelTagProps {
  level: 1 | 2 | 3 | 4;
}

const BioSafetyLevelTag: React.FC<BioSafetyLevelTagProps> = ({ level }) => {
  const colors = {
    1: 'green',
    2: 'gold',
    3: 'orange',
    4: 'red',
  };

  return (
    <Tooltip title={`Biosafety Level ${level}`}>
      <Tag color={colors[level]}>BSL-{level}</Tag>
    </Tooltip>
  );
};

export default BioSafetyLevelTag; 