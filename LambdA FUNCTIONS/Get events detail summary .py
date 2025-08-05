import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
TABLE_NAME = 'EventTable'

# Helper function to convert Decimal to float or int
def convert_decimal(obj):
    if isinstance(obj, list):
        return [convert_decimal(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimal(v) for k, v in obj.items()}
    elif isinstance(obj, Decimal):
        # convert to int if no decimal part, else float
        return int(obj) if obj % 1 == 0 else float(obj)
    return obj

def lambda_handler(event, context):
    try:
        print("Fetching events from EventTable")
        table = dynamodb.Table(TABLE_NAME)
        response = table.scan()
        events = response.get('Items', [])

        # Convert any Decimal values
        events = convert_decimal(events)
        print(f"Fetched {len(events)} events")

        return {
            'statusCode': 200,
            'body': json.dumps(events),
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,GET'
            }
        }

    except Exception as e:
        print(f"Error fetching events: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,GET'
            }
        }
