from flask import Blueprint, request, jsonify
from services.scinote_integration import SciNoteIntegration
from utils.validators import validate_sync_data
from services.db import get_db
from models.sync_record import SyncRecord

scinote_bp = Blueprint('scinote', __name__)
scinote_service = SciNoteIntegration()

@scinote_bp.route('/sync/chemical', methods=['POST'])
async def sync_chemical():
    """同步化学品数据到 SciNote"""
    try:
        data = request.get_json()
        if not validate_sync_data(data):
            return jsonify({
                'success': False,
                'error': 'Invalid data format'
            }), 400
            
        result = await scinote_service.sync_chemical_inventory(data)
        return jsonify(result), 200 if result['success'] else 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@scinote_bp.route('/sync/experiment', methods=['POST'])
async def sync_experiment():
    """同步实验数据到 SciNote"""
    try:
        data = request.get_json()
        result = await scinote_service.sync_experiment_data(data)
        return jsonify(result), 200 if result['success'] else 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@scinote_bp.route('/sync/status/<entity_id>', methods=['GET'])
async def get_sync_status(entity_id: str):
    """获取同步状态"""
    try:
        async with get_db() as db:
            record = await db.query(SyncRecord).filter(
                SyncRecord.entity_id == entity_id
            ).order_by(SyncRecord.sync_time.desc()).first()
            
            if not record:
                return jsonify({
                    'success': False,
                    'error': 'No sync record found'
                }), 404
                
            return jsonify({
                'success': True,
                'data': {
                    'status': record.sync_status,
                    'sync_time': record.sync_time.isoformat(),
                    'scinote_id': record.scinote_id,
                    'error_message': record.error_message
                }
            }), 200
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500 