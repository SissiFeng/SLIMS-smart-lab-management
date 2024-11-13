import React, { useState } from 'react';
import { Modal, Tabs, Descriptions, Space, Tag, Button, Select, Alert } from 'antd';
import { DownloadOutlined, CopyOutlined, ShareAltOutlined, ScissorOutlined } from '@ant-design/icons';
import type { Plasmid } from '../types';
import SequenceViewer from './SequenceViewer';
import RestrictionAnalysis from './RestrictionAnalysis';

interface PlasmidMapViewerProps {
  visible: boolean;
  plasmid: Plasmid | null;
  onClose: () => void;
}

const PlasmidMapViewer: React.FC<PlasmidMapViewerProps> = ({
  visible,
  plasmid,
  onClose,
}) => {
  const [selectedEnzymes, setSelectedEnzymes] = useState<string[]>([]);

  if (!plasmid) return null;

  return (
    <Modal
      title={`Plasmid Map - ${plasmid.name}`}
      open={visible}
      onCancel={onClose}
      width={1200}
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
              <div style={{ height: 600 }}>
                <div className="map-toolbar">
                  <Space>
                    <Select
                      mode="multiple"
                      placeholder="Select restriction enzymes"
                      style={{ width: 300 }}
                      onChange={setSelectedEnzymes}
                      options={[
                        { label: 'EcoRI', value: 'EcoRI' },
                        { label: 'BamHI', value: 'BamHI' },
                        { label: 'HindIII', value: 'HindIII' },
                      ]}
                    />
                    <Button icon={<ScissorOutlined />}>
                      Analyze Sites
                    </Button>
                  </Space>
                </div>
                <div className="map-container">
                  {/* 这里集成实际的质粒图谱查看器组件 */}
                  <Alert
                    message="Map Viewer"
                    description="Integrate with SnapGene or other plasmid map viewer here"
                    type="info"
                  />
                </div>
              </div>
            ),
          },
          {
            key: 'features',
            label: 'Features',
            children: (
              <>
                <Descriptions column={2}>
                  <Descriptions.Item label="Vector">{plasmid.vector}</Descriptions.Item>
                  <Descriptions.Item label="Size">{plasmid.size} kb</Descriptions.Item>
                  <Descriptions.Item label="Resistance">
                    {plasmid.resistance.map((r) => (
                      <Tag key={r} color="blue">{r}</Tag>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item label="Features">
                    {plasmid.features.map((f) => (
                      <Tag key={f}>{f}</Tag>
                    ))}
                  </Descriptions.Item>
                </Descriptions>
                <RestrictionAnalysis
                  sequence={plasmid.sequence}
                  enzymes={selectedEnzymes}
                />
              </>
            ),
          },
          {
            key: 'sequence',
            label: 'Sequence',
            children: (
              <SequenceViewer
                sequence={plasmid.sequence}
                features={plasmid.features}
              />
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default PlasmidMapViewer; 