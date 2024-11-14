from flask import Blueprint, request, jsonify
from utils.webhook import verify_webhook_signature

webhook_bp = Blueprint('webhook', __name__)

@webhook_bp.route('/scinote/webhook', methods=['POST'])
async def handle_webhook():
    """处理来自 SciNote 的 webhook"""
    if not verify_webhook_signature(request):
        return jsonify({'error': 'Invalid signature'}), 401
        
    event_type = request.headers.get('X-SciNote-Event')
    payload = request.json
    
    try:
        # 处理不同类型的事件
        if event_type == 'inventory.updated':
            await handle_inventory_update(payload)
        elif event_type == 'experiment.created':
            await handle_experiment_created(payload)
            
        return jsonify({'success': True}), 200
        
    except Exception as e:
        logger.error(f"Webhook processing error: {str(e)}")
        return jsonify({'error': str(e)}), 500 