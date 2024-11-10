from flask import Flask
from flask_cors import CORS
from .routes import register_routes

def create_app():
    """创建Flask应用"""
    app = Flask(__name__)
    CORS(app)  # 启用跨域支持
    
    # 注册路由
    register_routes(app)
    
    return app
