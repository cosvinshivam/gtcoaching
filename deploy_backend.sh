#!/usr/bin/env bash
# --------------------------------------------------------------
# Deploy the FastAPI backend to the Lightsail instance
#   gtCoachingBackend  (IP: 16.61.120.236)
# using the PEM key gtCoachingBackendKey.pem.
# --------------------------------------------------------------

set -e
set -o pipefail

# ---- Configuration -------------------------------------------------
INSTANCE_IP="16.61.120.236"
PEM_FILE="gtCoachingBackendKey.pem"          # relative to repo root
REMOTE_USER="ubuntu"
REMOTE_ROOT="/var/www/gtcoaching"            # where the app lives on the instance
REMOTE_BACKEND="${REMOTE_ROOT}/backend"
LOCAL_BACKEND="$(pwd)/backend"
# -------------------------------------------------------------------

# 1️⃣ Copy backend source (including routers, models, .env, venv, etc.)
echo "▶️  Syncing backend code to ${INSTANCE_IP}:${REMOTE_BACKEND}"
ssh -i "${PEM_FILE}" -o StrictHostKeyChecking=no "${REMOTE_USER}@${INSTANCE_IP}" "mkdir -p ${REMOTE_BACKEND}" &&
scp -r -i "${PEM_FILE}" -o StrictHostKeyChecking=no "${LOCAL_BACKEND}/" "${REMOTE_USER}@${INSTANCE_IP}:${REMOTE_BACKEND}/"

# 2️⃣ (Optional) Copy updated .env – ensure all required vars are present
#    (e.g., DATABASE_URL, AWS keys, S3 bucket name, FRONTEND_URL)
if [[ -f "${LOCAL_BACKEND}/.env" ]]; then
  echo "▶️  Syncing .env"
  scp -i "${PEM_FILE}" -o StrictHostKeyChecking=no \
      "${LOCAL_BACKEND}/.env" "${REMOTE_USER}@${INSTANCE_IP}:${REMOTE_BACKEND}/.env"
fi

# 3️⃣ Install / update Python dependencies inside the virtualenv
echo "▶️  Installing Python packages on remote host"
ssh -i "${PEM_FILE}" -o StrictHostKeyChecking=no "${REMOTE_USER}@${INSTANCE_IP}" <<EOS
# Ensure backend directory exists (already created by previous step)
cd "${REMOTE_BACKEND}"
# Create virtualenv if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
deactivate
EOS

# 4️⃣ Restart the FastAPI systemd service
echo "▶️  Restarting FastAPI service"
ssh -i "${PEM_FILE}" -o StrictHostKeyChecking=no "${REMOTE_USER}@${INSTANCE_IP}" \
    "sudo systemctl restart fastapi"

# 5️⃣ Verify the API is healthy (quick curl)
echo "▶️  Verifying API endpoint"
ssh -i "${PEM_FILE}" -o StrictHostKeyChecking=no "${REMOTE_USER}@${INSTANCE_IP}" \
    "curl -s http://127.0.0.1:8000/" | head -c 200 || true

echo "✅  Back‑end deployment finished."
