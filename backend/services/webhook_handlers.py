from typing import Dict
from utils.logger import get_logger
from services.db import get_db
from models.sync_record import SyncRecord

logger = get_logger(__name__)

async def handle_inventory_update(payload: Dict):
    """处理库存更新事件"""
    try:
        inventory_item = payload.get('data', {})
        item_id = inventory_item.get('id')
        
        async with get_db() as db:
            # 更新同步记录
            sync_record = SyncRecord(
                entity_type='chemical',
                entity_id=item_id,
                scinote_id=item_id,
                sync_status='success',
                details=payload
            )
            db.add(sync_record)
            await db.commit()
            
    except Exception as e:
        logger.error(f"Failed to handle inventory update: {str(e)}")
        raise

async def handle_experiment_created(payload: Dict):
    """处理实验创建事件"""
    try:
        experiment = payload.get('data', {})
        experiment_id = experiment.get('id')
        
        async with get_db() as db:
            sync_record = SyncRecord(
                entity_type='experiment',
                entity_id=experiment_id,
                scinote_id=experiment_id,
                sync_status='success',
                details=payload
            )
            db.add(sync_record)
            await db.commit()
            
    except Exception as e:
        logger.error(f"Failed to handle experiment creation: {str(e)}")
        raise 