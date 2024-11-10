from flask import Flask
from .inventory_routes import inventory_bp
from .safety_routes import safety_bp
from .analytics_routes import analytics_bp

def register_routes(app: Flask):
    """注册所有路由蓝图"""
    app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
    app.register_blueprint(safety_bp, url_prefix='/api/safety')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
