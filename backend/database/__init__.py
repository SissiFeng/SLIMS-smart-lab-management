from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
import os

# 数据库配置
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./smart_inventory.db')

# 创建数据库引擎
engine = create_engine(
    DATABASE_URL,
    echo=True,  # 在开发环境中打印 SQL 语句
    pool_pre_ping=True  # 自动处理断开的连接
)

# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建基类
Base = declarative_base()

@contextmanager
def get_db():
    """数据库会话上下文管理器"""
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
