#!/usr/bin/env bash
# Full QA pipeline: lint → build → playwright → report
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

mkdir -p test-results/screenshots

STEP=0
TOTAL=5
FAILURES=()

step() {
  STEP=$((STEP + 1))
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "  Bước $STEP/$TOTAL: $1"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

run_step() {
  local name="$1"
  shift
  step "$name"
  if "$@"; then
    echo "✅ $name — thành công"
  else
    echo "❌ $name — thất bại"
    FAILURES+=("$name")
    return 1
  fi
}

PIPELINE_START=$(date +%s)
PIPELINE_OK=true

run_step "Lint (ESLint)" npm run lint || PIPELINE_OK=false
run_step "Build (Next.js export → out/)" npm run build || PIPELINE_OK=false

if [[ "$PIPELINE_OK" == "true" ]]; then
  step "Cài Playwright Chromium (nếu chưa có)"
  if npx playwright install chromium; then
    echo "✅ Playwright Chromium — sẵn sàng"
  else
    echo "❌ Không cài được Playwright Chromium"
    FAILURES+=("Playwright install")
    PIPELINE_OK=false
  fi
fi

if [[ "$PIPELINE_OK" == "true" ]]; then
  step "Playwright E2E + chụp màn hình"
  if npm run test:e2e; then
    echo "✅ Playwright — thành công"
  else
    echo "❌ Playwright — thất bại (xem playwright-report/ và test-results/)"
    FAILURES+=("Playwright E2E")
    PIPELINE_OK=false
  fi
else
  echo ""
  echo "⏭️  Bỏ qua Playwright vì bước trước thất bại."
  FAILURES+=("Playwright E2E (bỏ qua)")
fi

step "Tạo báo cáo"
node scripts/generate-report.js "${FAILURES[@]+"${FAILURES[@]}"}" || true

PIPELINE_END=$(date +%s)
DURATION=$((PIPELINE_END - PIPELINE_START))

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [[ "$PIPELINE_OK" == "true" ]]; then
  echo "✅ Pipeline hoàn tất trong ${DURATION}s"
  echo "   Báo cáo: test-results/report.md"
  echo "   Ảnh chụp: test-results/screenshots/"
  echo "   HTML report: playwright-report/index.html"
  exit 0
else
  echo "❌ Pipeline thất bại trong ${DURATION}s"
  echo "   Các bước lỗi: ${FAILURES[*]}"
  echo "   Báo cáo: test-results/report.md"
  echo ""
  echo "   → Sửa lỗi UI/lint rồi chạy lại: npm run test:full"
  exit 1
fi
