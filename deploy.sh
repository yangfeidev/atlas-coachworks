#!/usr/bin/env bash
# 部署到 Cloudflare Pages（直传）
#
# 为什么先拷到临时目录：`wrangler pages deploy .` 会把目录里所有文件都当静态资源上传，
# 包括 README.md / .gitignore / .assetsignore，这些会在 https://<项目>.pages.dev/README.md 被公开访问。
# 这里只放行 index.html 和 assets/，其余一律不上传。
set -euo pipefail
cd "$(dirname "$0")"

PROJECT="atlas-coachworks"
BRANCH="main"

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

cp index.html "$STAGE"/
cp -R assets "$STAGE"/

echo "→ 待上传文件："
( cd "$STAGE" && find . -type f | sed 's|^\./||' )

npx --yes wrangler pages deploy "$STAGE" \
  --project-name="$PROJECT" \
  --branch="$BRANCH" \
  --commit-dirty=true
