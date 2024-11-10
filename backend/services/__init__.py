from typing import Dict, List, Optional
from uuid import UUID
from datetime import datetime

class ServiceResult:
    """服务层返回结果的标准格式"""
    def __init__(
        self,
        success: bool,
        data: Optional[Dict] = None,
        error: Optional[str] = None
    ):
        self.success = success
        self.data = data
        self.error = error

    def dict(self) -> Dict:
        return {
            'success': self.success,
            'data': self.data,
            'error': self.error
        }
