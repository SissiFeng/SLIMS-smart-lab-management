from typing import Dict, List, Optional
from datetime import datetime
import requests
from .base_service import BaseService
from utils.logger import get_logger
from config import SCINOTE_CONFIG
from tenacity import retry, stop_after_attempt, wait_exponential

logger = get_logger(__name__)

class SciNoteIntegration(BaseService):
    """SciNote 集成服务"""
    
    def __init__(self):
        super().__init__()
        self.base_url = SCINOTE_CONFIG['api_url']
        self.headers = {
            'Authorization': f'Bearer {SCINOTE_CONFIG["api_key"]}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    
    async def sync_chemical_inventory(self, chemical_data: Dict) -> Dict:
        """同步化学品库存到 SciNote"""
        try:
            endpoint = f'/api/v1/teams/{SCINOTE_CONFIG["team_id"]}/inventories'
            
            inventory_data = {
                "data": {
                    "type": "inventories", 
                    "attributes": {
                        "name": "Chemical Inventory"
                    }
                }
            }
            
            inventory_response = await self._make_request(
                'POST',
                endpoint,
                json=inventory_data
            )
            
            if not inventory_response.get('data', {}).get('id'):
                raise Exception("Failed to create inventory")
            
            inventory_id = inventory_response['data']['id']
            
            items_endpoint = f'{endpoint}/{inventory_id}/items'
            
            item_data = {
                "data": {
                    "type": "inventory_items",
                    "attributes": {
                        "name": chemical_data['name'],
                        "identifier": chemical_data.get('cas_number')
                    }
                },
                "included": [
                    {
                        "type": "inventory_cells",
                        "attributes": {
                            "value": str(chemical_data.get('current_quantity')),
                            "column_id": SCINOTE_CONFIG['quantity_column_id']
                        }
                    },
                    {
                        "type": "inventory_cells", 
                        "attributes": {
                            "value": chemical_data.get('unit'),
                            "column_id": SCINOTE_CONFIG['unit_column_id']
                        }
                    }
                ]
            }
            
            response = await self._make_request(
                'POST',
                items_endpoint,
                json=item_data
            )
            
            return self._handle_response(response)
            
        except Exception as e:
            logger.error(f"Failed to sync chemical with SciNote: {str(e)}")
            return {'success': False, 'error': str(e)}
    
    async def sync_experiment_data(self, experiment_data: Dict) -> Dict:
        """同步实验数据到 SciNote"""
        try:
            scinote_data = self._format_experiment_data(experiment_data)
            
            response = await self._make_request(
                'POST',
                '/api/v1/experiments',
                json=scinote_data
            )
            
            return {
                'success': True,
                'experiment_id': response.get('id')
            }
            
        except Exception as e:
            logger.error(f"Failed to sync experiment: {str(e)}")
            return {'success': False, 'error': str(e)}
    
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    async def _make_request(self, method: str, endpoint: str, **kwargs) -> Dict:
        """发送请求到 SciNote API 并处理常见错误"""
        url = f"{self.base_url}{endpoint}"
        try:
            response = requests.request(
                method,
                url,
                headers=self.headers,
                timeout=SCINOTE_CONFIG['timeout'],
                **kwargs
            )
            
            if response.status_code == 429:  # Rate limit exceeded
                retry_after = int(response.headers.get('Retry-After', 60))
                raise RateLimitExceeded(f"Rate limit exceeded. Retry after {retry_after} seconds")
                
            response.raise_for_status()
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"SciNote API request failed: {str(e)}")
            raise
    
    def _format_chemical_data(self, data: Dict) -> Dict:
        """根据 SciNote API 文档格式化数据"""
        return {
            'inventory_item': {
                'name': data['name'],
                'identifier': data.get('cas_number'),
                'quantity': str(data.get('current_quantity')),
                'unit': data.get('unit'),
                'location': data.get('location'),
                'custom_fields': {
                    'hazard_level': data.get('hazard_level'),
                    'storage_conditions': data.get('storage_conditions'),
                    'expiry_date': data.get('expiry_date')
                }
            }
        }
    
    def _format_experiment_data(self, data: Dict) -> Dict:
        """格式化实验数据以匹配 SciNote API 格式"""
        return {
            'title': data['title'],
            'description': data.get('description'),
            'start_date': data.get('start_date'),
            'project_id': data.get('project_id'),
            'protocol': {
                'steps': data.get('steps', []),
                'materials': data.get('materials', [])
            },
            'results': data.get('results', {}),
            'metadata': {
                'created_at': datetime.now().isoformat(),
                'source_system': 'SLIMS'
            }
        }
    
    def _handle_response(self, response: Dict) -> Dict:
        """处理 SciNote API 响应"""
        if response.get('errors'):
            return {
                'success': False,
                'error': response['errors']
            }
        return {
            'success': True,
            'scinote_id': response.get('data', {}).get('id'),
            'message': 'Chemical synced with SciNote successfully'
        } 