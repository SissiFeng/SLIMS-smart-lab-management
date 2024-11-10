from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID
from database import get_db, models
from database.crud import ChemicalCRUD, SafetyRecordCRUD
from sqlalchemy.orm import Session

class SafetyChecker:
    """安全检查系统"""
    
    def __init__(self):
        self.safety_thresholds = {
            'temperature': {'min': 15, 'max': 25},  # 摄氏度
            'humidity': {'min': 30, 'max': 60},     # 百分比
            'pressure': {'min': 900, 'max': 1100}   # 百帕
        }
    
    async def validate_chemical(self, chemical_data: Dict) -> Dict:
        """验证新化学品的安全性"""
        try:
            async with get_db() as db:
                # 检查危险等级
                hazard_check = await self._check_hazard_level(chemical_data)
                if not hazard_check['is_safe']:
                    return hazard_check
                
                # 检查化学品相容性
                compatibility_check = await self._check_compatibility(db, chemical_data)
                if not compatibility_check['is_safe']:
                    return compatibility_check
                
                # 验证存储条件
                storage_check = await self._validate_storage_conditions(db, chemical_data)
                if not storage_check['is_safe']:
                    return storage_check
                
                # 记录安全检查结果
                await SafetyRecordCRUD.create_safety_record(
                    db,
                    chemical_data.get('id'),
                    'initial_validation',
                    'pass',
                    {
                        'hazard_check': hazard_check,
                        'compatibility_check': compatibility_check,
                        'storage_check': storage_check
                    }
                )
                
                return {
                    'is_safe': True,
                    'message': 'All safety checks passed',
                    'details': {
                        'hazard_check': hazard_check,
                        'compatibility_check': compatibility_check,
                        'storage_check': storage_check
                    }
                }
                
        except Exception as e:
            return {
                'is_safe': False,
                'message': f'Safety check error: {str(e)}'
            }
    
    async def get_status(self, chemical_id: UUID) -> Dict:
        """获取化学品的安全状态"""
        try:
            async with get_db() as db:
                # 获取化学品信息
                chemical = await ChemicalCRUD.get_chemical(db, chemical_id)
                if not chemical:
                    return {'success': False, 'error': 'Chemical not found'}
                
                # 获取最新的安全记录
                latest_safety_record = await SafetyRecordCRUD.get_latest_safety_record(
                    db,
                    chemical_id,
                    'routine_check'
                )
                
                # 获取环境数据
                environment_data = await self._get_environment_data(db, chemical.location_id)
                
                # 检查当前条件
                current_safety_status = await self._check_current_conditions(
                    db,
                    chemical,
                    environment_data
                )
                
                return {
                    'success': True,
                    'data': {
                        'current_status': current_safety_status,
                        'last_check': latest_safety_record.timestamp if latest_safety_record else None,
                        'environment_data': environment_data
                    }
                }
                
        except Exception as e:
            return {'success': False, 'error': str(e)}
    
    async def _get_environment_data(self, db: Session, location_id: UUID) -> Dict:
        """获取环境数据"""
        latest_log = await db.query(models.EnvironmentLog)\
            .filter(models.EnvironmentLog.location_id == location_id)\
            .order_by(models.EnvironmentLog.timestamp.desc())\
            .first()
            
        if not latest_log:
            return {
                'temperature': None,
                'humidity': None,
                'pressure': None,
                'last_updated': None
            }
            
        return {
            'temperature': latest_log.temperature,
            'humidity': latest_log.humidity,
            'pressure': latest_log.pressure,
            'last_updated': latest_log.timestamp
        }
    
    async def _check_current_conditions(
        self,
        db: Session,
        chemical: models.Chemical,
        environment_data: Dict
    ) -> Dict:
        """检查当前条件"""
        issues = []
        
        # 检查环境条件
        if environment_data['temperature']:
            if not self._is_within_range(
                environment_data['temperature'],
                chemical.storage_conditions.get('temperature_range', self.safety_thresholds['temperature'])
            ):
                issues.append('Temperature out of range')
        
        if environment_data['humidity']:
            if not self._is_within_range(
                environment_data['humidity'],
                chemical.storage_conditions.get('humidity_range', self.safety_thresholds['humidity'])
            ):
                issues.append('Humidity out of range')
        
        # 记录检查结果
        status = 'pass' if not issues else 'warning'
        await SafetyRecordCRUD.create_safety_record(
            db,
            chemical.id,
            'routine_check',
            status,
            {
                'issues': issues,
                'environment_data': environment_data
            }
        )
        
        return {
            'status': status,
            'issues': issues,
            'timestamp': datetime.utcnow()
        }
    
    async def _check_hazard_level(self, chemical_data: Dict) -> Dict:
        """检查危险等级"""
        try:
            hazard_level = chemical_data.get('hazard_level', 0)
            
            # 检查是否超过最高允许等级
            if hazard_level > 3:  # 假设最高允许等级为3
                return {
                    'is_safe': False,
                    'message': f'Hazard level {hazard_level} exceeds maximum allowed level'
                }
            
            # 检查是否需要特殊处理
            special_handling = []
            if hazard_level >= 2:
                special_handling.append('Requires ventilated storage')
            if chemical_data.get('flammable'):
                special_handling.append('Requires flame-proof storage')
                
            return {
                'is_safe': True,
                'message': 'Hazard level acceptable',
                'special_handling': special_handling
            }
            
        except Exception as e:
            return {
                'is_safe': False,
                'message': f'Hazard check error: {str(e)}'
            }
    
    async def _check_compatibility(self, db: Session, chemical_data: Dict) -> Dict:
        """检查化学品相容性"""
        try:
            # 获取化学品特性
            chemical_class = chemical_data.get('chemical_class')
            reactive_groups = chemical_data.get('reactive_groups', [])
            
            # 获取存储区域内的其他化学品
            nearby_chemicals = await self._get_nearby_chemicals(None)  # 新化学品还没有ID
            
            # 检查相容性
            incompatible_items = []
            for nearby in nearby_chemicals:
                if not self._are_chemicals_compatible(
                    chemical_class,
                    reactive_groups,
                    nearby['chemical_class'],
                    nearby['reactive_groups']
                ):
                    incompatible_items.append(nearby)
            
            if incompatible_items:
                return {
                    'is_safe': False,
                    'message': 'Incompatible chemicals found in storage area',
                    'incompatible_with': incompatible_items
                }
            
            return {
                'is_safe': True,
                'message': 'No compatibility issues found'
            }
            
        except Exception as e:
            return {
                'is_safe': False,
                'message': f'Compatibility check error: {str(e)}'
            }
    
    async def _validate_storage_conditions(self, db: Session, chemical_data: Dict) -> Dict:
        """验证存储条件"""
        try:
            required_conditions = chemical_data.get('storage_conditions', {})
            current_conditions = await self._get_environment_data(None)
            
            # 检查温度
            if not self._is_within_range(
                current_conditions['temperature'],
                required_conditions.get('temperature_range', self.safety_thresholds['temperature'])
            ):
                return {
                    'is_safe': False,
                    'message': 'Temperature out of acceptable range'
                }
            
            # 检查湿度
            if not self._is_within_range(
                current_conditions['humidity'],
                required_conditions.get('humidity_range', self.safety_thresholds['humidity'])
            ):
                return {
                    'is_safe': False,
                    'message': 'Humidity out of acceptable range'
                }
            
            return {
                'is_safe': True,
                'message': 'Storage conditions acceptable'
            }
            
        except Exception as e:
            return {
                'is_safe': False,
                'message': f'Storage condition check error: {str(e)}'
            }
    
    def _is_within_range(self, value: float, range_dict: Dict) -> bool:
        """检查值是否在指定范围内"""
        return range_dict['min'] <= value <= range_dict['max']
    
    def _are_chemicals_compatible(
        self,
        class1: str,
        reactive_groups1: List[str],
        class2: str,
        reactive_groups2: List[str]
    ) -> bool:
        """检查两种化学品是否相容"""
        # 这里需要实现详细的化学品相容性规则
        # 可以使用查找表或其他方法
        pass
