from flask import Blueprint, request, jsonify
from ..utils.request_utils import validate_request
from ...services.safety_service import SafetyService
from ...core.modules.safety_checker import SafetyChecker

safety_bp = Blueprint('safety', __name__)
safety_service = SafetyService()

@safety_bp.route('/monitor', methods=['GET'])
def get_safety_status():
    """Get current safety monitoring status"""
    try:
        status = safety_service.get_safety_status()
        return jsonify(status), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@safety_bp.route('/alerts', methods=['GET'])
def get_alerts():
    """Get all active safety alerts"""
    try:
        alerts = safety_service.get_active_alerts()
        return jsonify(alerts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@safety_bp.route('/alerts/acknowledge', methods=['POST'])
@validate_request
def acknowledge_alert():
    """Acknowledge a safety alert"""
    alert_id = request.json.get('alert_id')
    try:
        result = safety_service.acknowledge_alert(alert_id)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
