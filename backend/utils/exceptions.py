class AppError(Exception):
    """应用基础异常类"""
    def __init__(self, message: str, status_code: int = 500):
        super().__init__(message)
        self.status_code = status_code
        self.message = message

class ValidationError(AppError):
    """验证错误"""
    def __init__(self, message: str):
        super().__init__(message, status_code=400)

class DatabaseError(AppError):
    """数据库错误"""
    def __init__(self, message: str):
        super().__init__(message, status_code=500)
