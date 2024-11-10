import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const InventoryOverview: React.FC = () => {
  const data = [
    { name: 'Acids', quantity: 38 },
    { name: 'Bases', quantity: 52 },
    { name: 'Salts', quantity: 61 },
    { name: 'Organic', quantity: 45 },
    { name: 'Solvents', quantity: 48 },
    { name: 'Others', quantity: 19 },
  ];

  return (
    <Card 
      title="Inventory Overview" 
      className="overview-card"
      style={{ height: '500px' }}
    >
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#144E5A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default InventoryOverview;
