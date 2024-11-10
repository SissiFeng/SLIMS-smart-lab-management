from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from . import models
from datetime import datetime, timedelta
import uuid

class ChemicalCRUD:
    """化学品CRUD操作"""
    
    @staticmethod
    async def create_chemical(db: Session, chemical_data: Dict) -> models.Chemical:
        """创建新的化学品记录"""
        db_chemical = models.Chemical(
            name=chemical_data['name'],
            cas_number=chemical_data.get('cas_number'),
            chemical_class=chemical_data.get('chemical_class'),
            hazard_level=chemical_data.get('hazard_level', 0),
            current_quantity=chemical_data.get('quantity', 0),
            unit=chemical_data.get('unit'),
            storage_conditions=chemical_data.get('storage_conditions', {}),
            minimum_quantity=chemical_data.get('minimum_quantity', 0),
            maximum_quantity=chemical_data.get('maximum_quantity', 0),
            location_id=chemical_data.get('location_id')
        )
        
        db.add(db_chemical)
        await db.flush()
        return db_chemical

    @staticmethod
    async def get_chemical(db: Session, chemical_id: uuid.UUID) -> Optional[models.Chemical]:
        """获取化学品信息"""
        return await db.query(models.Chemical).filter(models.Chemical.id == chemical_id).first()

    @staticmethod
    async def update_quantity(
        db: Session,
        chemical_id: uuid.UUID,
        quantity_change: float,
        transaction_type: str,
        operator: str
    ) -> Dict:
        """更新化学品数量"""
        chemical = await ChemicalCRUD.get_chemical(db, chemical_id)
        if not chemical:
            return {'success': False, 'error': 'Chemical not found'}
            
        # 更新数量
        new_quantity = chemical.current_quantity + quantity_change
        if new_quantity < 0:
            return {'success': False, 'error': 'Insufficient quantity'}
            
        chemical.current_quantity = new_quantity
        chemical.updated_at = datetime.utcnow()
        
        # 记录交易
        transaction = models.Transaction(
            chemical_id=chemical_id,
            transaction_type=transaction_type,
            quantity=quantity_change,
            unit=chemical.unit,
            operator=operator
        )
        db.add(transaction)
        
        await db.flush()
        return {
            'success': True,
            'data': {
                'new_quantity': new_quantity,
                'transaction_id': transaction.id
            }
        }

    @staticmethod
    async def search_chemicals(
        db: Session,
        search_params: Dict
    ) -> List[models.Chemical]:
        """高级搜索化学品"""
        query = db.query(models.Chemical)
        
        # 按名称搜索
        if search_params.get('name'):
            query = query.filter(models.Chemical.name.ilike(f"%{search_params['name']}%"))
        
        # 按CAS号搜索
        if search_params.get('cas_number'):
            query = query.filter(models.Chemical.cas_number == search_params['cas_number'])
        
        # 按危险等级搜索
        if search_params.get('hazard_level'):
            query = query.filter(models.Chemical.hazard_level == search_params['hazard_level'])
        
        # 按库存量范围搜索
        if search_params.get('min_quantity'):
            query = query.filter(models.Chemical.current_quantity >= search_params['min_quantity'])
        if search_params.get('max_quantity'):
            query = query.filter(models.Chemical.current_quantity <= search_params['max_quantity'])
        
        # 按位置搜索
        if search_params.get('location_id'):
            query = query.filter(models.Chemical.location_id == search_params['location_id'])
        
        return await query.all()

    @staticmethod
    async def get_low_stock_chemicals(
        db: Session,
        threshold_percentage: float = 0.2
    ) -> List[models.Chemical]:
        """获取低库存化学品"""
        return await db.query(models.Chemical)\
            .filter(models.Chemical.current_quantity <= models.Chemical.minimum_quantity * threshold_percentage)\
            .all()

    @staticmethod
    async def get_expiring_chemicals(
        db: Session,
        days: int = 30
    ) -> List[models.Chemical]:
        """获取即将过期的化学品"""
        expiry_date = datetime.utcnow() + timedelta(days=days)
        return await db.query(models.Chemical)\
            .filter(models.Chemical.expiry_date <= expiry_date)\
            .all()

class SafetyRecordCRUD:
    """安全记录CRUD操作"""
    
    @staticmethod
    async def create_safety_record(
        db: Session,
        chemical_id: uuid.UUID,
        check_type: str,
        status: str,
        details: Dict
    ) -> models.SafetyRecord:
        """创建安全记录"""
        safety_record = models.SafetyRecord(
            chemical_id=chemical_id,
            check_type=check_type,
            status=status,
            details=details
        )
        db.add(safety_record)
        await db.flush()
        return safety_record

    @staticmethod
    async def get_latest_safety_record(
        db: Session,
        chemical_id: uuid.UUID,
        check_type: str
    ) -> Optional[models.SafetyRecord]:
        """获取最新的安全记录"""
        return await db.query(models.SafetyRecord)\
            .filter(
                models.SafetyRecord.chemical_id == chemical_id,
                models.SafetyRecord.check_type == check_type
            )\
            .order_by(models.SafetyRecord.timestamp.desc())\
            .first()

class TransactionCRUD:
    """交易记录CRUD操作"""
    
    @staticmethod
    async def get_transactions(
        db: Session,
        chemical_id: uuid.UUID,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        transaction_type: Optional[str] = None
    ) -> List[models.Transaction]:
        """获取交易记录"""
        query = db.query(models.Transaction)\
            .filter(models.Transaction.chemical_id == chemical_id)
        
        if start_date:
            query = query.filter(models.Transaction.timestamp >= start_date)
        if end_date:
            query = query.filter(models.Transaction.timestamp <= end_date)
        if transaction_type:
            query = query.filter(models.Transaction.transaction_type == transaction_type)
        
        return await query.order_by(models.Transaction.timestamp.desc()).all()

    @staticmethod
    async def get_usage_statistics(
        db: Session,
        chemical_id: uuid.UUID,
        period: str = 'month'
    ) -> Dict:
        """获取使用统计"""
        # 确定时间范围
        end_date = datetime.utcnow()
        if period == 'week':
            start_date = end_date - timedelta(days=7)
        elif period == 'month':
            start_date = end_date - timedelta(days=30)
        elif period == 'year':
            start_date = end_date - timedelta(days=365)
        else:
            raise ValueError("Invalid period")

        # 获取交易记录
        transactions = await TransactionCRUD.get_transactions(
            db,
            chemical_id,
            start_date,
            end_date,
            'out'
        )

        # 计算统计数据
        total_usage = sum(abs(t.quantity) for t in transactions)
        usage_count = len(transactions)
        average_usage = total_usage / usage_count if usage_count > 0 else 0

        return {
            'period': period,
            'total_usage': total_usage,
            'usage_count': usage_count,
            'average_usage': average_usage,
            'start_date': start_date,
            'end_date': end_date
        }
