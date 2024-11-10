from datetime import datetime, timedelta
from typing import Dict, List, Optional
from uuid import UUID
import numpy as np
from sqlalchemy.orm import Session
from database import get_db, models
from database.crud import ChemicalCRUD

class StockMonitor:
    """库存监控系统"""
    
    def __init__(self):
        self.alert_thresholds = {
            'low_stock': 0.2,  # 20% 的库存触发低库存警告
            'expiring_soon': 30,  # 30天内过期警告
            'usage_anomaly': 2.0  # 使用量超过平均值2倍触发异常警告
        }
    
    async def setup_monitoring(self, chemical_id: UUID) -> Dict:
        """设置化学品监控"""
        try:
            async with get_db() as db:
                # 验证化学品是否存在
                chemical = await ChemicalCRUD.get_chemical(db, chemical_id)
                if not chemical:
                    return {'success': False, 'error': 'Chemical not found'}
                
                # 设置监控参数
                monitoring_config = {
                    'chemical_id': chemical_id,
                    'created_at': datetime.now(),
                    'alert_settings': self.alert_thresholds,
                    'monitoring_status': 'active'
                }
                
                # 更新化学品记录
                chemical.is_monitored = True
                chemical.monitoring_config = monitoring_config
                await db.flush()
                
                return {'success': True, 'config': monitoring_config}
                
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    async def get_status(self, chemical_id: UUID) -> Dict:
        """获取化学品当前状态"""
        try:
            async with get_db() as db:
                # 获取化学品信息
                chemical = await ChemicalCRUD.get_chemical(db, chemical_id)
                if not chemical:
                    return {'success': False, 'error': 'Chemical not found'}
                
                # 获取库存信息
                inventory_data = {
                    'current_quantity': chemical.current_quantity,
                    'unit': chemical.unit,
                    'minimum_quantity': chemical.minimum_quantity,
                    'maximum_quantity': chemical.maximum_quantity
                }
                
                # 分析使用趋势
                usage_trends = await self._analyze_usage_trends(db, chemical_id)
                
                # 预测未来需求
                future_demand = await self._predict_future_demand(db, chemical_id)
                
                # 检查警报
                alerts = await self.check_alerts(chemical_id, chemical.current_quantity)
                
                return {
                    'success': True,
                    'data': {
                        'inventory': inventory_data,
                        'usage_trends': usage_trends,
                        'future_demand': future_demand,
                        'alerts': alerts
                    }
                }
                
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    async def _get_usage_history(self, db: Session, chemical_id: UUID) -> List[Dict]:
        """获取使用历史"""
        transactions = await db.query(models.Transaction)\
            .filter(
                models.Transaction.chemical_id == chemical_id,
                models.Transaction.transaction_type == 'out'
            )\
            .order_by(models.Transaction.timestamp)\
            .all()
            
        return [
            {
                'timestamp': t.timestamp,
                'quantity': abs(t.quantity),
                'unit': t.unit
            }
            for t in transactions
        ]
    
    async def _analyze_usage_trends(self, db: Session, chemical_id: UUID) -> Dict:
        """分析使用趋势"""
        usage_history = await self._get_usage_history(db, chemical_id)
        if not usage_history:
            return {
                'average_daily_usage': 0,
                'peak_usage': 0,
                'usage_pattern': 'No usage data available'
            }
        
        quantities = [h['quantity'] for h in usage_history]
        return {
            'average_daily_usage': np.mean(quantities),
            'peak_usage': max(quantities),
            'usage_pattern': self._determine_usage_pattern(quantities)
        }
    
    def _determine_usage_pattern(self, quantities: List[float]) -> str:
        """确定使用模式"""
        if not quantities:
            return 'No pattern'
            
        variance = np.var(quantities)
        mean = np.mean(quantities)
        cv = variance / mean if mean != 0 else 0
        
        if cv < 0.1:
            return 'Stable'
        elif cv < 0.3:
            return 'Moderate variation'
        else:
            return 'Highly variable'
