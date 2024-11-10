from flask import Blueprint, request, jsonify
from ..utils.request_utils import validate_request
from ...services.inventory_service import InventoryService
from ...core.modules.inventory_manager import InventoryManager

inventory_bp = Blueprint('inventory', __name__)
inventory_service = InventoryService()

@inventory_bp.route('/list', methods=['GET'])
def get_inventory_list():
    """Get list of all chemicals in inventory"""
    try:
        chemicals = inventory_service.get_all_chemicals()
        return jsonify(chemicals), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@inventory_bp.route('/stock/in', methods=['POST'])
@validate_request
def stock_in():
    """Record stock in transaction"""
    data = request.json
    try:
        result = inventory_service.add_stock(data)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@inventory_bp.route('/stock/out', methods=['POST'])
@validate_request
def stock_out():
    """Record stock out transaction"""
    data = request.json
    try:
        result = inventory_service.reduce_stock(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
