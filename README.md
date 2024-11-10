# SLIMS (Smart Laboratory Inventory Management System)

A smart laboratory inventory management system that helps laboratories efficiently manage chemical inventory with intelligent features for safety monitoring and predictive analytics.
<img width="1524" alt="截屏2024-11-10 16 29 07" src="https://github.com/user-attachments/assets/ce8b066e-77d1-4b3a-a5c1-9ee0aae8632b">

## Smart Features

- **Intelligent Stock Management**
  - Automatic stock level monitoring with configurable thresholds
  - Smart reorder point calculation based on historical usage patterns
  - Expiration date tracking with advance notifications
  - Barcode/QR code scanning for quick stock operations
  - Multi-location inventory tracking
  - Batch tracking and management
<img width="1536" alt="截屏2024-11-10 16 29 29" src="https://github.com/user-attachments/assets/a11fcf64-1c67-4f4a-aff5-a52fc8156464">

- **Advanced Safety System**
  - Real-time monitoring of:
  - 
    - Temperature (with customizable ranges)
    - Humidity
    - Air pressure
    - Ventilation status
  - Chemical compatibility matrix
  - Automated hazard classification
  - Emergency response procedure integration
  - Safety compliance checklist automation
  - Incident logging and investigation tools

- **Predictive Analytics**
  - Machine learning based usage pattern analysis
  - Predictive stock level forecasting
  - Seasonal trend identification
  - Cost optimization suggestions
  - Automated report generation with customizable templates
  - Data visualization dashboards
<img width="1525" alt="截屏2024-11-10 16 29 59" src="https://github.com/user-attachments/assets/ebd355b4-50d4-49f3-9485-11770593c587">

- **Smart Notifications**
  - Configurable alert thresholds
  - Multi-channel notifications (email, in-app, SMS)
  - Priority-based alert system
  - Alert acknowledgment tracking
  - Escalation workflows
  - Historical alert analysis
<img width="1526" alt="截屏2024-11-10 16 29 44" src="https://github.com/user-attachments/assets/fdd3603f-bfc8-4886-b6a4-f98bf8e0e9f5">

## Technical Features

- **Frontend**
  - React-based responsive web interface
  - Real-time data updates
  - Interactive dashboards
  - Mobile-friendly design
  - Role-based access control

- **Backend**
  - RESTful API architecture
  - Real-time data processing
  - Advanced security measures
  - Automated backup system
  - Audit logging
  - API rate limiting

- **Integration Capabilities**
  - ERP system integration
  - LIMS integration
  - Environmental monitoring system integration
  - Barcode scanner support
  - Export to common formats (PDF, Excel, CSV)

## Security Features

- Role-based access control
- API authentication
- Data encryption
- Audit logging
- Session management
- Input validation
- XSS protection
- CSRF protection

## Database Schema

### Core Tables

- **Chemicals**
  ```sql
  chemicals
  - id: UUID (PK)
  - name: VARCHAR
  - cas_number: VARCHAR
  - category: VARCHAR
  - hazard_level: VARCHAR
  - storage_conditions: JSONB
  - created_at: TIMESTAMP
  - updated_at: TIMESTAMP
  ```

- **Inventory**
  ```sql
  inventory
  - id: UUID (PK)
  - chemical_id: UUID (FK)
  - batch_number: VARCHAR
  - quantity: DECIMAL
  - unit: VARCHAR
  - location_id: UUID (FK)
  - expiry_date: DATE
  - status: VARCHAR
  - created_at: TIMESTAMP
  - updated_at: TIMESTAMP
  ```

- **Locations**
  ```sql
  locations
  - id: UUID (PK)
  - name: VARCHAR
  - type: VARCHAR
  - capacity: DECIMAL
  - parent_id: UUID (FK)
  - environment_monitor: BOOLEAN
  - created_at: TIMESTAMP
  - updated_at: TIMESTAMP
  ```

### Transaction Tables

- **Stock_Transactions**
  ```sql
  stock_transactions
  - id: UUID (PK)
  - inventory_id: UUID (FK)
  - type: VARCHAR (in/out)
  - quantity: DECIMAL
  - unit: VARCHAR
  - operator_id: UUID (FK)
  - timestamp: TIMESTAMP
  - notes: TEXT
  ```

### Safety Monitoring

- **Environment_Records**
  ```sql
  environment_records
  - id: UUID (PK)
  - location_id: UUID (FK)
  - temperature: DECIMAL
  - humidity: DECIMAL
  - pressure: DECIMAL
  - timestamp: TIMESTAMP
  ```

- **Safety_Alerts**
  ```sql
  safety_alerts
  - id: UUID (PK)
  - type: VARCHAR
  - severity: VARCHAR
  - location_id: UUID (FK)
  - chemical_id: UUID (FK)
  - status: VARCHAR
  - details: JSONB
  - created_at: TIMESTAMP
  - resolved_at: TIMESTAMP
  ```

### User Management

- **Users**
  ```sql
  users
  - id: UUID (PK)
  - username: VARCHAR
  - email: VARCHAR
  - password_hash: VARCHAR
  - role: VARCHAR
  - status: VARCHAR
  - created_at: TIMESTAMP
  - updated_at: TIMESTAMP
  ```

- **Audit_Logs**
  ```sql
  audit_logs
  - id: UUID (PK)
  - user_id: UUID (FK)
  - action: VARCHAR
  - entity_type: VARCHAR
  - entity_id: UUID
  - details: JSONB
  - ip_address: VARCHAR
  - timestamp: TIMESTAMP
  ```

### Analytics

- **Usage_Statistics**
  ```sql
  usage_statistics
  - id: UUID (PK)
  - chemical_id: UUID (FK)
  - period: DATE
  - consumption: DECIMAL
  - cost: DECIMAL
  - created_at: TIMESTAMP
  ```

## Project Structure
```
SLIMS/
├── backend/
│   ├── api/                  
│   ├── core/                  
│   ├── database/              
│   ├── services/               
│   └── utils/           
├── frontend/               
├── ml_models/                 
└── tests/                      

backend/
├── api/
│   ├── routes/
│   └── utils/
├── core/modules/
│   ├── inventory_manager.py
│   ├── safety_checker.py
│   └── stock_monitor.py
├── database/
│   ├── migrations/
│   ├── crud.py
│   └── models.py
├── services/
│   ├── analytics_service.py
│   ├── inventory_service.py
│   └── safety_service.py
└── utils/
    ├── constants.py
    ├── exceptions.py
    ├── helper.py
    ├── logger.py
    └── validators.py        

deployment/
├── docker-compose.yml        
├── Dockerfile             
└── kubernetes/
```    
