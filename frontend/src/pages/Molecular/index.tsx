import React from 'react';
import { Tabs } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ApiOutlined, EditOutlined, SplitCellsOutlined } from '@ant-design/icons';
import './index.scss';

const Molecular: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getActiveKey = () => {
    const path = location.pathname.split('/');
    return path[path.length - 1] || 'plasmid-maps';
  };

  const items = [
    {
      key: 'plasmid-maps',
      label: (
        <span>
          <ApiOutlined />
          Plasmid Maps
        </span>
      ),
    },
    {
      key: 'primer-design',
      label: (
        <span>
          <EditOutlined />
          Primer Design
        </span>
      ),
    },
    {
      key: 'cloning',
      label: (
        <span>
          <SplitCellsOutlined />
          Cloning Records
        </span>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(`/molecular/${key}`);
  };

  return (
    <div className="molecular-container">
      <Tabs 
        activeKey={getActiveKey()}
        items={items}
        onChange={handleTabChange}
        className="molecular-tabs"
      />
      <div className="molecular-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Molecular; 