#!/usr/bin/env bash
set -euo pipefail
# Static site: --smoke / --fast / full all run the same build + assertions (fast enough).
echo "Building site..."
npm run build >/dev/null
echo "Running build assertions..."
node scripts/check-build.mjs
