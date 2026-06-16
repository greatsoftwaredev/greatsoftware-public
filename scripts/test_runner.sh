#!/usr/bin/env bash
set -euo pipefail
# --smoke / --fast / full all run the full build + assertions (build is fast; no lighter mode needed).
RAW="${1:-full}"
MODE="${RAW#--}"
echo "Building site... (mode: $MODE)"
npm run build >/dev/null
echo "Running build assertions..."
node scripts/check-build.mjs "$MODE"
