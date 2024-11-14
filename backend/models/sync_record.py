from datetime import datetime
from sqlalchemy import Column, String, DateTime, JSON
from .base import Base

class SyncRecord(Base):
    __tablename__ = 'sync_records'
    
    id = Column(String, primary_key=True)
    entity_type = Column(String)  # 'chemical' or 'experiment'
    entity_id = Column(String)
    scinote_id = Column(String)
    sync_status = Column(String)  # 'success' or 'failed'
    error_message = Column(String, nullable=True)
    sync_time = Column(DateTime, default=datetime.utcnow)
    details = Column(JSON, nullable=True) 