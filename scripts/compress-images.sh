#!/bin/bash

# 图片压缩脚本
# 使用前需要安装: brew install jpegoptim optipng

echo "🖼️  压缩 public/images 下的图片..."

# 压缩 JPEG 图片 (保持 80% 质量，通常能减少 40-60% 大小)
if command -v jpegoptim &> /dev/null; then
    echo "压缩 JPEG 图片..."
    find ./public/images -name "*.jpg" -o -name "*.jpeg" | xargs -I {} jpegoptim --max=80 --strip-all {}
else
    echo "⚠️  jpegoptim 未安装，跳过 JPEG 压缩"
    echo "   安装命令: brew install jpegoptim"
fi

# 压缩 PNG 图片
if command -v optipng &> /dev/null; then
    echo "压缩 PNG 图片..."
    find ./public/images -name "*.png" | xargs -I {} optipng -o5 {}
else
    echo "⚠️  optipng 未安装，跳过 PNG 压缩"
    echo "   安装命令: brew install optipng"
fi

echo "✅ 压缩完成！"

