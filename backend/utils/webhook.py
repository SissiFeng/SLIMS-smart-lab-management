import hmac
import hashlib
from flask import Request
from config import SCINOTE_CONFIG

def verify_webhook_signature(request: Request) -> bool:
    """验证 webhook 签名"""
    signature = request.headers.get('X-SciNote-Signature')
    if not signature:
        return False
        
    secret = SCINOTE_CONFIG['webhook']['secret'].encode()
    payload = request.get_data()
    
    expected_signature = hmac.new(
        secret,
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature) 