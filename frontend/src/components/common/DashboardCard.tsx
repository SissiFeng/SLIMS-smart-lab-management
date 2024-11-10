// src/components/common/DashboardCard.tsx
import React from 'react';
import { Card, Statistic } from 'antd';

interface DashboardCardProps {
  title: string;
  value: number;
  prefix?: React.ReactNode;
  suffix?: string;
  loading?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  loading = false
}) => {
  return (
    <Card loading={loading} className="dashboard-card">
      <Statistic
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
      />
    </Card>
  );
};

export default DashboardCard;  // 确保有这行导出语句