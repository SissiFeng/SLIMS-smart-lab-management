# backend/services/safety_service.py
from ..database.crud import CRUDBase
from ..database.models import SafetyRecord, Chemical, Location, EnvironmentLog
from ..core.modules.safety_checker import SafetyChecker
from datetime import datetime, timedelta

class SafetyService:
    def __init__(self):
        self.crud = CRUDBase()
        self.safety_checker = SafetyChecker()

    def get_safety_status(self):
        """Get overall safety status including environment conditions"""
        try:
            # Get latest environment logs
            env_status = self._get_environment_status()
            
            # Get chemical safety status
            chemical_status = self._get_chemical_safety_status()
            
            # Get storage compatibility status
            compatibility_status = self.safety_checker.check_storage_compatibility()
            
            return {
                "environment": env_status,
                "chemicals": chemical_status,
                "compatibility": compatibility_status,
                "last_updated": datetime.utcnow().isoformat()
            }
        except Exception as e:
            raise Exception(f"Failed to get safety status: {str(e)}")

    def get_active_alerts(self):
        """Get all active safety alerts"""
        try:
            # Get unacknowledged safety records
            records = self.crud.read_filtered(
                SafetyRecord,
                filters={"status": ["warning", "fail"]},
                order_by={"timestamp": "desc"}
            )
            
            return [self._format_alert(record) for record in records]
        except Exception as e:
            raise Exception(f"Failed to get alerts: {str(e)}")

    def acknowledge_alert(self, alert_id):
        """Acknowledge a safety alert"""
        try:
            record = self.crud.read_by_id(SafetyRecord, alert_id)
            if not record:
                raise Exception("Alert not found")
            
            # Update record with acknowledgment
            record.details["acknowledged"] = True
            record.details["acknowledged_at"] = datetime.utcnow().isoformat()
            self.crud.update(record)
            
            return {"message": "Alert acknowledged successfully"}
        except Exception as e:
            raise Exception(f"Failed to acknowledge alert: {str(e)}")

    def _get_environment_status(self):
        """Get current environment conditions for all locations"""
        locations = self.crud.read_all(Location)
        return {
            "locations": [
                {
                    "id": str(loc.id),
                    "zone": loc.zone,
                    "temperature": loc.current_temperature,
                    "humidity": loc.current_humidity,
                    "pressure": loc.current_pressure,
                    "last_checked": loc.last_checked.isoformat(),
                    "status": self._check_environment_status(loc)
                }
                for loc in locations
            ]
        }

    def _get_chemical_safety_status(self):
        """Check safety status of all chemicals"""
        chemicals = self.crud.read_all(Chemical)
        return {
            "total": len(chemicals),
            "expired": sum(1 for c in chemicals if c.expiry_date and c.expiry_date < datetime.utcnow()),
            "expiring_soon": sum(1 for c in chemicals if c.expiry_date and 
                               datetime.utcnow() < c.expiry_date < datetime.utcnow() + timedelta(days=30)),
            "hazardous": sum(1 for c in chemicals if c.hazard_level >= 3)
        }

    def _check_environment_status(self, location):
        """Check if environment conditions are within acceptable range"""
        # This should be customized based on your requirements
        temp_ok = 20 <= location.current_temperature <= 25
        humidity_ok = 30 <= location.current_humidity <= 60
        
        if temp_ok and humidity_ok:
            return "normal"
        return "warning"

    def _format_alert(self, record):
        """Format safety record as alert"""
        return {
            "id": str(record.id),
            "type": record.check_type,
            "status": record.status,
            "details": record.details,
            "timestamp": record.timestamp.isoformat(),
            "chemical": {
                "id": str(record.chemical.id),
                "name": record.chemical.name
            } if record.chemical else None
        }