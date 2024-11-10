from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
from . import Base

class Chemical(Base):
    """Chemical table"""
    __tablename__ = 'chemicals'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    cas_number = Column(String)
    chemical_class = Column(String)
    hazard_level = Column(Integer)
    
    # Inventory information
    current_quantity = Column(Float)
    unit = Column(String)
    minimum_quantity = Column(Float)
    maximum_quantity = Column(Float)
    
    # Storage conditions
    storage_conditions = Column(JSON)  # temperature, humidity requirements
    location_id = Column(UUID(as_uuid=True), ForeignKey('locations.id'))
    
    # Manufacturer information
    manufacturer = Column(String)
    supplier = Column(String)
    
    # Time information
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    expiry_date = Column(DateTime)
    
    # Relationships
    location = relationship("Location", back_populates="chemicals")
    transactions = relationship("Transaction", back_populates="chemical")
    safety_records = relationship("SafetyRecord", back_populates="chemical")
    batches = relationship("Batch", back_populates="chemical")

class Batch(Base):
    """Batch table for tracking chemical batches"""
    __tablename__ = 'batches'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chemical_id = Column(UUID(as_uuid=True), ForeignKey('chemicals.id'))
    batch_number = Column(String, nullable=False)
    
    # Quantity information
    initial_quantity = Column(Float)
    current_quantity = Column(Float)
    unit = Column(String)
    
    # Dates
    manufacturing_date = Column(DateTime)
    expiry_date = Column(DateTime)
    received_date = Column(DateTime, default=datetime.utcnow)
    
    # Status
    status = Column(String)  # 'active', 'expired', 'depleted'
    
    # Relationships
    chemical = relationship("Chemical", back_populates="batches")
    transactions = relationship("Transaction", back_populates="batch")

class Location(Base):
    """Location table"""
    __tablename__ = 'locations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    zone = Column(String)
    shelf = Column(String)
    position = Column(String)
    
    # Environment monitoring
    current_temperature = Column(Float)
    current_humidity = Column(Float)
    current_pressure = Column(Float)
    
    # Status
    is_available = Column(Boolean, default=True)
    last_checked = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    chemicals = relationship("Chemical", back_populates="location")
    environment_logs = relationship("EnvironmentLog", back_populates="location")

class Transaction(Base):
    """Transaction record table"""
    __tablename__ = 'transactions'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chemical_id = Column(UUID(as_uuid=True), ForeignKey('chemicals.id'))
    batch_id = Column(UUID(as_uuid=True), ForeignKey('batches.id'))
    
    transaction_type = Column(String)  # 'in', 'out', 'adjust'
    quantity = Column(Float)
    unit = Column(String)
    
    # Additional fields for stock management
    purpose = Column(String)
    requested_by = Column(String)
    approved_by = Column(String)
    
    timestamp = Column(DateTime, default=datetime.utcnow)
    operator = Column(String)
    notes = Column(String)
    
    # Relationships
    chemical = relationship("Chemical", back_populates="transactions")
    batch = relationship("Batch", back_populates="transactions")

class SafetyRecord(Base):
    """Safety record table"""
    __tablename__ = 'safety_records'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chemical_id = Column(UUID(as_uuid=True), ForeignKey('chemicals.id'))
    
    check_type = Column(String)  # 'compatibility', 'environment', 'expiry'
    status = Column(String)  # 'pass', 'warning', 'fail'
    details = Column(JSON)
    
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    chemical = relationship("Chemical", back_populates="safety_records")

class EnvironmentLog(Base):
    """Environment monitoring log table"""
    __tablename__ = 'environment_logs'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    location_id = Column(UUID(as_uuid=True), ForeignKey('locations.id'))
    
    temperature = Column(Float)
    humidity = Column(Float)
    pressure = Column(Float)
    
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    location = relationship("Location", back_populates="environment_logs")
