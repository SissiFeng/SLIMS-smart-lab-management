// frontend/src/services/api/safety.ts
import { request } from './request';

export interface SafetyStatus {
  environment: {
    locations: {
      id: string;
      zone: string;
      temperature: number;
      humidity: number;
      pressure: number;
      last_checked: string;
      status: 'normal' | 'warning';
    }[];
  };
  chemicals: {
    total: number;
    expired: number;
    expiring_soon: number;
    hazardous: number;
  };
  compatibility: {
    status: string;
    issues: string[];
  };
  last_updated: string;
}

export interface SafetyAlert {
  id: string;
  type: 'compatibility' | 'environment' | 'expiry';
  status: 'warning' | 'fail';
  details: Record<string, any>;
  timestamp: string;
  chemical?: {
    id: string;
    name: string;
  };
}

export const safetyApi = {
  getSafetyStatus: () => {
    return request<SafetyStatus>({
      url: '/safety/monitor',
      method: 'GET',
    });
  },

  getAlerts: () => {
    return request<SafetyAlert[]>({
      url: '/safety/alerts',
      method: 'GET',
    });
  },

  acknowledgeAlert: (alertId: string) => {
    return request<{ message: string }>({
      url: '/safety/alerts/acknowledge',
      method: 'POST',
      data: { alert_id: alertId },
    });
  },
};