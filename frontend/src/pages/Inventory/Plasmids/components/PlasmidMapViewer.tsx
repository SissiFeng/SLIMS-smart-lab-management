import React from 'react';
import { Modal, Tabs, Descriptions, Space, Tag, Button } from 'antd';
import { DownloadOutlined, CopyOutlined, ShareAltOutlined } from '@ant-design/icons';

interface PlasmidMapViewerProps {
  visible: boolean;
  plasmid: any | null;
  onClose: () => void;
}

const PlasmidMapViewer: React.FC<PlasmidMapViewerProps> = ({
  visible,
  plasmid,
  onClose,
}) => {
  if (!plasmid) return null;

  return (
    <Modal
      title={`Plasmid Map - ${plasmid.name}`}
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="share" icon={<ShareAltOutlined />}>
          Share
        </Button>,
        <Button key="copy" icon={<CopyOutlined />}>
          Copy Sequence
        </Button>,
        <Button key="download" type="primary" icon={<DownloadOutlined />}>
          Download Map
        </Button>,
      ]}
    >
      <Tabs
        items={[
          {
            key: 'map',
            label: 'Plasmid Map',
            children: (
              <div style={{ height: 500 }}>
                {/* 集成 SnapGene 或其他质粒图谱查看器 */}
                <div>Plasmid Map Viewer Component</div>
              </div>
            ),
          },
          {
            key: 'features',
            label: 'Features',
            children: (
              <Descriptions column={2}>
                <Descriptions.Item label="Vector">{plasmid.vector}</Descriptions.Item>
                <Descriptions.Item label="Size">{plasmid.size} kb</Descriptions.Item>
                <Descriptions.Item label="Resistance">
                  {plasmid.resistance.map((r: string) => (
                    <Tag key={r} color="blue">{r}</Tag>
                  ))}
                </Descriptions.Item>
                <Descriptions.Item label="Copy Number">
                  {plasmid.copy_number}
                </Descriptions.Item>
              </Descriptions>
            ),
          },
          {
            key: 'sequence',
            label: 'Sequence',
            children: (
              <div style={{ height: 400, overflow: 'auto' }}>
                {/* 序列查看器组件 */}
                <pre>Sequence Viewer Component</pre>
              </div>
            ),
          },
          {
            key: 'history',
            label: 'History',
            children: (
              <div>
                {/* 历史记录组件 */}
                <div>History Component</div>
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default PlasmidMapViewer; 