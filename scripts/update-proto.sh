#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PACKAGE_NAME="@legendaryneobatman/shop-proto-repo"
REPO_URL="https://github.com/legendaryneobatman/shop-proto-repo"

echo -e "${BLUE}🔄 Updating proto contracts...${NC}"

# Получаем последний тег из GitHub
echo -e "${YELLOW}🔍 Fetching latest tags...${NC}"

LATEST_TAG=$(git ls-remote --tags --refs ${REPO_URL}.git | \
    grep -oP 'refs/tags/v\d+\.\d+\.\d+$' | \
    sed 's|refs/tags/||' | \
    sort -t. -k1,1n -k2,2n -k3,3n | \
    tail -n1)

if [ -z "$LATEST_TAG" ]; then
    echo -e "${RED}❌ No version tags found${NC}"
    exit 1
fi

# Получаем текущую версию из package.json
CURRENT_VERSION=$(node -p "require('./package.json').dependencies['${PACKAGE_NAME}']" 2>/dev/null | grep -oP 'v\d+\.\d+\.\d+' || echo "not installed")

echo -e "${YELLOW}Current: ${CURRENT_VERSION}${NC}"
echo -e "${GREEN}Latest:  ${LATEST_TAG}${NC}"

if [ "$CURRENT_VERSION" = "$LATEST_TAG" ]; then
    echo -e "${GREEN}✅ Already up to date!${NC}"
    exit 0
fi

# Обновляем пакет
echo -e "${GREEN}📦 Updating to ${LATEST_TAG}...${NC}"

bun install ${PACKAGE_NAME}@github:legendaryneobatman/shop-proto-repo#${LATEST_TAG}

echo -e "${GREEN}✅ Package updated to ${LATEST_TAG}${NC}"

# Опционально: автокоммит
if [ "$1" = "--commit" ] || [ "$1" = "-c" ]; then
    echo -e "${GREEN}📝 Committing changes...${NC}"

    git add package.json package-lock.json

    if git diff --staged --quiet; then
        echo -e "${YELLOW}No changes to commit${NC}"
    else
        git commit -m "chore: update proto contracts to ${LATEST_TAG}"
        echo -e "${GREEN}✨ Committed!${NC}"
    fi
else
    echo -e "${YELLOW}💡 Run with --commit flag to auto-commit changes${NC}"
fi

echo -e "${GREEN}✨ Done! Proto updated to ${LATEST_TAG}${NC}"
echo -e "${YELLOW}Package: ${PACKAGE_NAME}@${LATEST_TAG}${NC}"
