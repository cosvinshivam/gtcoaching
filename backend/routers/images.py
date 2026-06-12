from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
import boto3
from botocore.exceptions import NoCredentialsError
import os
from routers.auth import get_current_user
import models

router = APIRouter()

S3_BUCKET = os.getenv("S3_BUCKET_NAME")
AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

def get_s3_client():
    return boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=AWS_REGION
    )

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(get_current_user)
):
    s3_client = get_s3_client()
    try:
        s3_client.upload_fileobj(
            file.file,
            S3_BUCKET,
            file.filename,
            ExtraArgs={"ContentType": file.content_type} # In production, you might want ACL='public-read'
        )
        url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{file.filename}"
        return {"url": url, "filename": file.filename}
    except NoCredentialsError:
        raise HTTPException(status_code=500, detail="S3 Credentials not available")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
def list_images(current_user: models.User = Depends(get_current_user)):
    s3_client = get_s3_client()
    try:
        response = s3_client.list_objects_v2(Bucket=S3_BUCKET)
        images = []
        if "Contents" in response:
            for obj in response["Contents"]:
                images.append({
                    "filename": obj["Key"],
                    "url": f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{obj['Key']}",
                    "size": obj["Size"],
                    "last_modified": obj["LastModified"]
                })
        return images
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{filename}")
def delete_image(filename: str, current_user: models.User = Depends(get_current_user)):
    s3_client = get_s3_client()
    try:
        s3_client.delete_object(Bucket=S3_BUCKET, Key=filename)
        return {"message": "Deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
