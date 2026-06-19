import os
import boto3
from dotenv import load_dotenv

# Load backend environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

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

# Frontend assets directory relative to this script
assets_dir = os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'src', 'assets')

if not os.path.exists(assets_dir):
    print(f"Error: Directory {assets_dir} not found.")
    exit(1)

def get_content_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    if ext == '.png':
        return 'image/png'
    elif ext in ['.jpg', '.jpeg']:
        return 'image/jpeg'
    elif ext == '.svg':
        return 'image/svg+xml'
    return 'binary/octet-stream'

uploaded_count = 0
for filename in os.listdir(assets_dir):
    filepath = os.path.join(assets_dir, filename)
    if os.path.isfile(filepath):
        # We upload it under the 'assets/' prefix so it's organized in S3
        s3_key = f"assets/{filename}"
        content_type = get_content_type(filename)
        
        try:
            print(f"Uploading {filename} to s3://{S3_BUCKET}/{s3_key}...")
            # We don't set ACL='public-read' because the bucket might not allow ACLs. 
            # We assume the bucket policy makes the bucket public or we access it via the URL.
            s3.upload_file(
                filepath, 
                S3_BUCKET, 
                s3_key,
                ExtraArgs={'ContentType': content_type}
            )
            url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{s3_key}"
            print(f"Successfully uploaded: {url}")
            uploaded_count += 1
        except Exception as e:
            print(f"Failed to upload {filename}: {str(e)}")

print(f"\nUpload complete. Total files uploaded: {uploaded_count}")
