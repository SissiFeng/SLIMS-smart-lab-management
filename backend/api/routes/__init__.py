from flask import Flask
from .inventory_routes import inventory_bp
from .scinote_routes import scinote_bp
from .webhook_routes import webhook_bp

def register_routes(app: Flask):
    """注册所有路由蓝图"""
    app.register_blueprint(inventory_bp, url_prefix='/api/inventory')
    app.register_blueprint(scinote_bp, url_prefix='/api/scinote')
    app.register_blueprint(webhook_bp, url_prefix='/api/webhook')
