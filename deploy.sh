#!/usr/bin/env bash
# 手动直传部署（备用方案：Git 连接不可用时用）
#
# 生产路径是 Cloudflare Pages 的 Git 连接：推送 main 自动构建，输出目录 public/。
# 本脚本直接上传同一个 public/ 目录，用于绕过 Git 救急。
set -euo pipefail
cd "$(dirname "$0")"

PROJECT="atlas-coachworks"
BRANCH="main"

echo "→ 待上传文件："
( cd public && find . -type f | sed 's|^\./||' )

npx --yes wrangler pages deploy ./public \
  --project-name="$PROJECT" \
  --branch="$BRANCH" \
  --commit-dirty=true
