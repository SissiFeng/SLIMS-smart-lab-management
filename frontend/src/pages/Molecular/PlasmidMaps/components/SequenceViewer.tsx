import React from 'react';
import { Card, Space, Button, Tooltip } from 'antd';
import { CopyOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';

interface SequenceViewerProps {
  sequence: string;
  features?: string[];
}

const SequenceViewer: React.FC<SequenceViewerProps> = ({ sequence, features }) => {
  const formatSequence = (seq: string): string => {
    // 将序列每10个碱基分组，每6组换行
    const groups = seq.match(/.{1,10}/g) || [];
    const lines = [];
    for (let i = 0; i < groups.length; i += 6) {
      lines.push(groups.slice(i, i + 6).join(' '));
    }
    return lines.join('\n');
  };

  return (
    <div className="sequence-viewer">
      <Space className="toolbar" style={{ marginBottom: 16 }}>
        <Button icon={<SearchOutlined />}>
          Find Sequence
        </Button>
        <Button icon={<CopyOutlined />}>
          Copy
        </Button>
        <Button icon={<DownloadOutlined />}>
          Download FASTA
        </Button>
      </Space>
      
      <Card
        style={{
          height: 400,
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.6'
        }}
      >
        <pre>{formatSequence(sequence)}</pre>
      </Card>
    </div>
  );
};

export default SequenceViewer; 