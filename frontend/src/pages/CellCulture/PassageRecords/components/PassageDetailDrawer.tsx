import React from 'react';
import { Drawer, Descriptions, Image, Space, Tag } from 'antd';
import type { PassageRecord } from '../types';

interface PassageDetailDrawerProps {
  visible: boolean;
  record: PassageRecord | null;
  onClose: () => void;
}

const PassageDetailDrawer: React.FC<PassageDetailDrawerProps> = ({
  visible,
  record,
  onClose,
}) => {
  if (!record) return null;

  return (
    <Drawer
      title="Passage Record Details"
      placement="right"
      onClose={onClose}
      open={visible}
      width={640}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="Cell Line">{record.cell_line_name}</Descriptions.Item>
        <Descriptions.Item label="Passage #">{record.passage_number}</Descriptions.Item>
        <Descriptions.Item label="Date">{record.date}</Descriptions.Item>
        <Descriptions.Item label="Confluence">{record.confluence}%</Descriptions.Item>
        <Descriptions.Item label="Viability">{record.viability}%</Descriptions.Item>
        <Descriptions.Item label="Growth Status">
          <Tag color={
            record.growth_status === 'Good' ? 'green' :
            record.growth_status === 'Fair' ? 'orange' : 'red'
          }>
            {record.growth_status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Media Type">{record.media_type}</Descriptions.Item>
        <Descriptions.Item label="Media Lot">{record.media_lot}</Descriptions.Item>
        <Descriptions.Item label="Performed By">{record.performed_by}</Descriptions.Item>
      </Descriptions>

      {record.notes && (
        <div style={{ marginTop: 24 }}>
          <h4>Notes</h4>
          <p>{record.notes}</p>
        </div>
      )}

      {record.images && record.images.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h4>Images</h4>
          <Space size={[8, 8]} wrap>
            {record.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={200}
                style={{ borderRadius: 8 }}
              />
            ))}
          </Space>
        </div>
      )}
    </Drawer>
  );
};

export default PassageDetailDrawer; 