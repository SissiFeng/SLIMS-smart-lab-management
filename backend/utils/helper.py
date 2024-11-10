from typing import Dict, Any
from datetime import datetime, date
import json
from uuid import UUID

class JSONEncoder(json.JSONEncoder):
    """自定义JSON编码器"""
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        if isinstance(obj, UUID):
            return str(obj)
        return super().default(obj)

def format_response(data: Any) -> str:
    """格式化响应数据"""
    return json.dumps(data, cls=JSONEncoder)

def calculate_expiry_status(expiry_date: datetime) -> Dict[str, Any]:
    """计算过期状态"""
    if not expiry_date:
        return {'status': 'unknown', 'days_remaining': None}
    
    today = datetime.now()
    days_remaining = (expiry_date - today).days
    
    if days_remaining < 0:
        return {'status': 'expired', 'days_remaining': 0}
    elif days_remaining <= 30:
        return {'status': 'expiring_soon', 'days_remaining': days_remaining}
    else:
        return {'status': 'valid', 'days_remaining': days_remaining}
