import React from 'react';
import { Drawer, Descriptions, Tag, Space, Button, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, HistoryOutlined } from '@ant-design/icons';
import StorageConditionTag from '../../components/StorageConditionTag';

interface PrimerDetailDrawerProps {
  visible: boolean;
  primer: any | null;
  onClose: () => void;
}

const PrimerDetailDrawer: React.FC<PrimerDetailDrawerProps> = ({
  visible,
  primer,
  onClose,
}) => {
  if (!primer) return null;

  const renderQualityCheck = (check: any) => {
    return (
      <Space direction="vertical">
        <Tag color={check.hairpin ? 'error' : 'success'}>
          Hairpin: {check.hairpin ? 'Warning' : 'OK'}
        </Tag>
        <Tag color={check.dimer ? 'error' : 'success'}>
          Dimer: {check.dimer ? 'Warning' : 'OK'}
        </Tag>
        <Tag color={check.specificity > 90 ? 'success' : 'warning'}>
          Specificity: {check.specificity}%
        </Tag>
      </Space>
    );
  };

  return (
    <Drawer
      title="Primer Details"
      placement="right"
      width={600}
      onClose={onClose}
      open={visible}
      extra={
        <Space>
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button icon={<DeleteOutlined />} danger>Delete</Button>
        </Space>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Name">{primer.name}</Descriptions.Item>
        <Descriptions.Item label="Sequence">{primer.sequence}</Descriptions.Item>
        <Descriptions.Item label="Length">{primer.length} bp</Descriptions.Item>
        <Descriptions.Item label="Tm">{primer.tm}°C</Descriptions.Item>
        <Descriptions.Item label="GC Content">{primer.gc_content}%</Descriptions.Item>
        <Descriptions.Item label="Direction">
          <Tag color={primer.direction === 'Forward' ? 'blue' : 'green'}>
            {primer.direction}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Storage">
          <Space>
            <StorageConditionTag temperature={primer.storage_temp} />
            <span>{primer.storage_location}</span>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={
            primer.status === 'Available' ? 'success' :
            primer.status === 'Low' ? 'warning' : 'error'
          }>
            {primer.status}
          </Tag>
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Quality Check</Divider>
      {renderQualityCheck(primer.quality_check)}

      <Divider orientation="left">Stock Information</Divider>
      <Descriptions column={1}>
        <Descriptions.Item label="Initial Amount">
          {primer.stock_info.initial_amount} {primer.stock_info.unit}
        </Descriptions.Item>
        <Descriptions.Item label="Current Amount">
          {primer.stock_info.current_amount} {primer.stock_info.unit}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">History</Divider>
      <Button icon={<HistoryOutlined />} block>
        View Usage History
      </Button>
    </Drawer>
  );
};

export default PrimerDetailDrawer; 