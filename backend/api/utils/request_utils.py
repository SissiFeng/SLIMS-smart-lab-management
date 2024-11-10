from functools import wraps
from flask import request, jsonify
from uuid import UUID
from datetime import datetime

def validate_json(f):
    """验证JSON请求装饰器"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not request.is_json:
            return jsonify({'success': False, 'error': 'Content-Type must be application/json'}), 400
        return f(*args, **kwargs)
    return decorated_function

def parse_uuid(uuid_str: str) -> UUID:
    """解析UUID字符串"""
    try:
        return UUID(uuid_str)
    except ValueError:
        raise ValueError(f"Invalid UUID format: {uuid_str}")

def parse_date(date_str: str) -> datetime:
    """解析日期字符串"""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, '%Y-%m-%d')
    except ValueError:
        raise ValueError(f"Invalid date format: {date_str}. Expected format: YYYY-MM-DD")
