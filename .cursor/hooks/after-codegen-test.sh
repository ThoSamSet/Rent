#!/usr/bin/env bash
# Chạy pipeline QA khi agent kết thúc (nếu có thay đổi web).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

# Chỉ chạy khi repo có package.json và script test:full
if [[ ! -f package.json ]] || ! grep -q '"test:full"' package.json 2>/dev/null; then
  echo '{}'
  exit 0
fi

# Bỏ qua nếu node_modules chưa cài
if [[ ! -d node_modules/@playwright ]]; then
  cat <<'EOF'
{
  "followup_message": "Chưa cài dev dependencies. Chạy: npm install — sau đó npm run test:full (pipeline sẽ tự cài Chromium)."
}
EOF
  exit 0
fi

LOG="$ROOT/test-results/hook-pipeline.log"
mkdir -p "$ROOT/test-results"

if npm run test:full >"$LOG" 2>&1; then
  cat <<EOF
{
  "followup_message": "Pipeline kiểm thử đã pass. Báo cáo: test-results/report.md | Ảnh: test-results/screenshots/"
}
EOF
else
  tail -40 "$LOG" > "$ROOT/test-results/hook-pipeline-tail.log" 2>/dev/null || true
  cat <<'EOF'
{
  "followup_message": "Pipeline kiểm thử THẤT BẠI. Đọc test-results/report.md, playwright-report/index.html và test-results/screenshots/. Sửa lỗi lint/UI/console rồi chạy lại npm run test:full."
}
EOF
  exit 0
fi
