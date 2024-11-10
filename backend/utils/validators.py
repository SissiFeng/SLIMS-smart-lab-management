from typing import Dict, Any
from datetime import datetime
from .exceptions import ValidationError

def validate_chemical_data(data: Dict[str, Any]) -> None:
    """验证化学品数据"""
    required_fields = ['name', 'cas_number', 'unit']
    
    # 检查必填字段
    for field in required_fields:
        if field not in data:
            raise ValidationError(f"Missing required field: {field}")
    
    # 验证数值字段
    if 'current_quantity' in data:
        validate_quantity(data['current_quantity'])
    
    if 'hazard_level' in data:
        if not isinstance(data['hazard_level'], int) or \
           not (0 <= data['hazard_level'] <= 4):
            raise ValidationError("Hazard level must be an integer between 0 and 4")
    
    # 验证日期字段
    if 'expiry_date' in data:
        try:
            if isinstance(data['expiry_date'], str):
                datetime.strptime(data['expiry_date'], '%Y-%m-%d')
        except ValueError:
            raise ValidationError("Invalid expiry date format. Expected: YYYY-MM-DD")

def validate_quantity(quantity: Any) -> None:
    """验证数量值"""
    try:
        float_quantity = float(quantity)
        if float_quantity < 0:
            raise ValidationError("Quantity cannot be negative")
    except (TypeError, ValueError):
        raise ValidationError("Invalid quantity value")
