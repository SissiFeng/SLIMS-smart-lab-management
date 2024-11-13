import React from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ExperimentOutlined, CloudOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './index.scss';

const CellCulture: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveKey = () => {
    const path = location.pathname.split('/');
    return path[path.length - 1] || 'passage';
  };

  const items = [
    {
      key: 'passage',
      label: (
        <span>
          <ExperimentOutlined />
          Passage Records
        </span>
      ),
    },
    {
      key: 'cryo',
      label: (
        <span>
          <CloudOutlined />
          Cryopreservation
        </span>
      ),
    },
    {
      key: 'thawing',
      label: (
        <span>
          <FieldTimeOutlined />
          Thawing Records
        </span>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(`/cell-culture/${key}`);
  };

  return (
    <div className="cell-culture-container">
      <Tabs 
        activeKey={getActiveKey()}
        items={items}
        onChange={handleTabChange}
        className="cell-culture-tabs"
      />
      <div className="cell-culture-content">
        <Outlet />
      </div>
    </div>
  );
};

export default CellCulture; 