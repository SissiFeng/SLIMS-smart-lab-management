from typing import Dict
import requests
from config import SCINOTE_CONFIG

class SciNoteAuth:
    def __init__(self):
        self.token = None
        self.token_url = f"{SCINOTE_CONFIG['api_url']}/oauth/token"
    
    async def get_access_token(self) -> str:
        """获取或刷新 OAuth access token"""
        if not self.token:
            self.token = await self._request_new_token()
        return self.token
    
    async def _request_new_token(self) -> str:
        """请求新的访问令牌"""
        data = {
            'grant_type': 'client_credentials',
            'client_id': SCINOTE_CONFIG['client_id'],
            'client_secret': SCINOTE_CONFIG['client_secret']
        }
        
        response = requests.post(self.token_url, data=data)
        response.raise_for_status()
        
        token_data = response.json()
        return token_data['access_token'] 