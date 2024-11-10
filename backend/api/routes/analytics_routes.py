from flask import Blueprint, request, jsonify
from services.analytics_service import AnalyticsService
from ..utils.request_utils import parse_uuid

analytics_bp = Blueprint('analytics', __name__)
analytics_service = AnalyticsService()

@analytics_bp.route('/usage-report/<chemical_id>', methods=['GET'])
async def get_usage_report(chemical_id: str):
    """获取使用报告"""
    try:
        chemical_uuid = parse_uuid(chemical_id)
        period = request.args.get('period', 'month')
        
        result = await analytics_service.generate_usage_report(
            chemical_uuid,
            period
        )
        return jsonify(result.dict()), 200 if result.success else 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
