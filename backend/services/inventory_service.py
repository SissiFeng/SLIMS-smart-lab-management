# backend/services/inventory_service.py
from ..database.crud import CRUDBase
from ..database.models import Chemical, Transaction, Batch
from ..core.modules.inventory_manager import InventoryManager
from datetime import datetime

class InventoryService:
    def __init__(self):
        self.crud = CRUDBase()
        self.inventory_manager = InventoryManager()

    def get_all_chemicals(self):
        """Get all chemicals with their current inventory status"""
        chemicals = self.crud.read_all(Chemical)
        return [self._format_chemical(chemical) for chemical in chemicals]

    def add_stock(self, data):
        """Process stock in transaction"""
        try:
            # Create new batch
            batch = Batch(
                chemical_id=data['chemical_id'],
                batch_number=data['batch_number'],
                initial_quantity=data['quantity'],
                current_quantity=data['quantity'],
                unit=data['unit'],
                manufacturing_date=datetime.fromisoformat(data['manufacturing_date']),
                expiry_date=datetime.fromisoformat(data['expiry_date']),
                status='active'
            )
            self.crud.create(batch)

            # Create transaction record
            transaction = Transaction(
                chemical_id=data['chemical_id'],
                batch_id=batch.id,
                transaction_type='in',
                quantity=data['quantity'],
                unit=data['unit'],
                purpose=data.get('purpose'),
                requested_by=data.get('requested_by'),
                operator=data.get('operator')
            )
            self.crud.create(transaction)

            # Update chemical quantity
            self.inventory_manager.update_chemical_quantity(data['chemical_id'])
            
            return {"message": "Stock in recorded successfully"}
        except Exception as e:
            raise Exception(f"Failed to process stock in: {str(e)}")

    def reduce_stock(self, data):
        """Process stock out transaction"""
        try:
            # Validate stock availability
            if not self.inventory_manager.check_stock_availability(
                data['chemical_id'], data['quantity']):
                raise Exception("Insufficient stock")

            # Create transaction record
            transaction = Transaction(
                chemical_id=data['chemical_id'],
                batch_id=data['batch_id'],
                transaction_type='out',
                quantity=data['quantity'],
                unit=data['unit'],
                purpose=data['purpose'],
                requested_by=data['requested_by'],
                operator=data.get('operator')
            )
            self.crud.create(transaction)

            # Update batch quantity
            self.inventory_manager.update_batch_quantity(data['batch_id'], -data['quantity'])
            
            # Update chemical quantity
            self.inventory_manager.update_chemical_quantity(data['chemical_id'])
            
            return {"message": "Stock out recorded successfully"}
        except Exception as e:
            raise Exception(f"Failed to process stock out: {str(e)}")

    def _format_chemical(self, chemical):
        """Format chemical object for API response"""
        return {
            "id": str(chemical.id),
            "name": chemical.name,
            "cas_number": chemical.cas_number,
            "current_quantity": chemical.current_quantity,
            "unit": chemical.unit,
            "location": f"{chemical.location.zone}-{chemical.location.shelf}" if chemical.location else None,
            "status": self._get_stock_status(chemical)
        }

    def _get_stock_status(self, chemical):
        """Determine stock status based on quantity"""
        if chemical.current_quantity <= chemical.minimum_quantity:
            return "Critical"
        elif chemical.current_quantity <= chemical.minimum_quantity * 2:
            return "Low"
        return "Normal"