# utils/constants.py

# 化学品相关常量
HAZARD_LEVELS = {
    0: "Safe",
    1: "Low Hazard",
    2: "Moderate Hazard",
    3: "High Hazard",
    4: "Extreme Hazard"
}

STORAGE_CONDITIONS = {
    'ROOM_TEMP': {
        'min_temp': 20,
        'max_temp': 25,
        'min_humidity': 30,
        'max_humidity': 60
    },
    'REFRIGERATED': {
        'min_temp': 2,
        'max_temp': 8,
        'min_humidity': 30,
        'max_humidity': 50
    },
    'FROZEN': {
        'min_temp': -20,
        'max_temp': -15,
        'min_humidity': 30,
        'max_humidity': 50
    }
}

# 交易类型
TRANSACTION_TYPES = {
    'IN': 'Stock In',
    'OUT': 'Stock Out',
    'ADJUST': 'Stock Adjustment',
    'DISPOSE': 'Disposal'
}

# 警报级别
ALERT_LEVELS = {
    'INFO': 'Information',
    'WARNING': 'Warning',
    'CRITICAL': 'Critical'
}
