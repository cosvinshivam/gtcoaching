import os
import boto3
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

S3_BUCKET = os.getenv('S3_BUCKET_NAME')
AWS_REGION = os.getenv('AWS_REGION', 'eu-west-2')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')

s3 = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

def upload_to_s3(filepath, filename):
    s3_key = f"assets/{filename}"
    try:
        s3.upload_file(
            filepath, 
            S3_BUCKET, 
            s3_key,
            ExtraArgs={'ContentType': 'image/png'}
        )
        url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{s3_key}"
        print(f"Successfully uploaded: {url}")
    except Exception as e:
        print(f"Failed to upload {filename}: {str(e)}")

upload_to_s3(
    r"C:\Users\Shivam\.gemini\antigravity\brain\d334d1da-fa6d-446b-9ac1-8f76e315ae6a\about_hero_modern_1781895342963.png",
    "about-hero-gym-modern.png"
)
