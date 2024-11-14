SCINOTE_CONFIG = {
    'api_url': 'https://app.scinote.net/api',
    'api_key': 'your_api_key_here',
    'team_id': 'your_team_id',
    'project_id': 'default_project_id',
    'quantity_column_id': 'your_quantity_column_id',
    'unit_column_id': 'your_unit_column_id',
    'sync_interval': 300,
    'rate_limit': {
        'max_requests': 100,
        'per_second': 60
    },
    'timeout': 30,
    'client_id': 'your_client_id',
    'client_secret': 'your_client_secret',
    'oauth_token_url': 'https://app.scinote.net/oauth/token',
    'oauth_scope': 'read write',
    'webhook': {
        'secret': 'your_webhook_secret',
        'enabled': True,
        'events': ['inventory.updated', 'experiment.created']
    }
} 