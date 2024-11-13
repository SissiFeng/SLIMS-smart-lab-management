import React from 'react';
import { Table, Alert } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface RestrictionSite {
  enzyme: string;
  position: number;
  sequence: string;
  overhang: string;
}

interface RestrictionAnalysisProps {
  sequence: string;
  enzymes: string[];
}

const RestrictionAnalysis: React.FC<RestrictionAnalysisProps> = ({
  sequence,
  enzymes
}) => {
  // 这里应该实现实际的限制性内切酶位点分析逻辑
  const mockSites: RestrictionSite[] = [
    {
      enzyme: 'EcoRI',
      position: 1234,
      sequence: 'GAATTC',
      overhang: "5' overhang",
    },
    {
      enzyme: 'BamHI',
      position: 2345,
      sequence: 'GGATCC',
      overhang: "5' overhang",
    },
  ];

  const columns: ColumnsType<RestrictionSite> = [
    {
      title: 'Enzyme',
      dataIndex: 'enzyme',
      key: 'enzyme',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Recognition Sequence',
      dataIndex: 'sequence',
      key: 'sequence',
      render: (text: string) => <code>{text}</code>,
    },
    {
      title: 'Overhang Type',
      dataIndex: 'overhang',
      key: 'overhang',
    },
  ];

  if (enzymes.length === 0) {
    return (
      <Alert
        message="No Restriction Enzymes Selected"
        description="Please select restriction enzymes to analyze cutting sites."
        type="info"
        showIcon
      />
    );
  }

  return (
    <div className="restriction-analysis">
      <Table
        columns={columns}
        dataSource={mockSites}
        pagination={false}
        size="small"
      />
    </div>
  );
};

export default RestrictionAnalysis; 