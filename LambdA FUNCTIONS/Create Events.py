import json
import boto3
import base64
import uuid
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

TABLE_SUMMARY = 'EventTable'
TABLE_DETAILS = 'EventDetailsTable'
BUCKET_NAME = 'event-images-store'


def safe_base64_decode(data):
    """Adds padding if needed and decodes base64."""
    missing_padding = len(data) % 4
    if missing_padding:
        data += '=' * (4 - missing_padding)
    return base64.b64decode(data)


def lambda_handler(event, context):
    logger.info("Event received: %s", event)

    try:
       
        if isinstance(event, dict) and 'body' in event and isinstance(event['body'], str):
            body = json.loads(event['body'])
        else:
            body = event  

        event_id = str(uuid.uuid4())
        image_url = None

        if 'bannerImage' in body and 'base64,' in body['bannerImage']:
            base64_data = body['bannerImage'].split('base64,')[1]
            image_data = safe_base64_decode(base64_data)
            key = f'events/{event_id}.jpg'

            s3.put_object(Bucket=BUCKET_NAME, Key=key, Body=image_data, ContentType='image/jpeg')
            image_url = f'https://{BUCKET_NAME}.s3.amazonaws.com/{key}'
            logger.info("Image uploaded to S3: %s", image_url)

    
        summary_table = dynamodb.Table(TABLE_SUMMARY)
        summary_item = {
            'eventId': event_id,
            'title': body.get('title'),
            'description': body.get('description'),
            'date': body.get('date'),
            'template': body.get('template', 'classic'),
            'image': image_url,
            'speakers': len(body.get('speakers', [])),
            'sessions': len(body.get('agenda', []))
        }
        logger.info("Writing summary to EventTable: %s", summary_item)
        summary_table.put_item(Item=summary_item)

     
        details_table = dynamodb.Table(TABLE_DETAILS)
        body['eventId'] = event_id
        body['image'] = image_url
        logger.info("Writing full body to EventDetailsTable")
        details_table.put_item(Item=body)

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Event created successfully', 'eventId': event_id}),
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            }
        }

    except Exception as e:
        logger.error("Error in createEvent: %s", str(e), exc_info=True)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            }
        }
