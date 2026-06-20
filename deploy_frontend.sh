#!/usr/bin/env bash
set -e

# Variables
S3_BUCKET="gtcoachingfrontend"
AWS_REGION="eu-west-2"
FRONTEND_DIR="$(pwd)/frontend"
BUILD_DIR="${FRONTEND_DIR}/dist" # Vite default output directory
export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_KEY"
# Ensure AWS CLI is configured (uses env variables or default profile)
echo "Building frontend..."
cd "$FRONTEND_DIR"
# Replace hardcoded localhost API URLs with relative /api for production
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|http://localhost:8000|/api|g' {} +
# Also fix any accidental double /api occurrences
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i 's|/api/api|/api|g' {} +
npm run build

echo "Syncing build to S3 bucket $S3_BUCKET..."
aws s3 sync "$BUILD_DIR" "s3://${S3_BUCKET}" --delete --region "$AWS_REGION"


echo "Frontend deployment completed."
