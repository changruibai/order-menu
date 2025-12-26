#!/bin/bash

# 将图片转换为 WebP 格式
# WebP 格式通常比 JPEG 小 25-35%
# 使用前需要安装: brew install webp

IMAGES_DIR="./public/images/dishes"

echo "🖼️  将图片转换为 WebP 格式..."

# 检查 cwebp 是否安装
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp 未安装"
    echo "   安装命令: brew install webp"
    exit 1
fi

# 转换 JPEG 图片
for img in "$IMAGES_DIR"/*.{jpg,jpeg,JPEG,JPG}; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        output="$IMAGES_DIR/${name}.webp"
        
        if [ ! -f "$output" ]; then
            echo "转换: $filename -> ${name}.webp"
            cwebp -q 80 "$img" -o "$output"
        else
            echo "跳过: ${name}.webp 已存在"
        fi
    fi
done

# 转换 PNG 图片
for img in "$IMAGES_DIR"/*.{png,PNG}; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        output="$IMAGES_DIR/${name}.webp"
        
        if [ ! -f "$output" ]; then
            echo "转换: $filename -> ${name}.webp"
            cwebp -q 80 -lossless "$img" -o "$output"
        else
            echo "跳过: ${name}.webp 已存在"
        fi
    fi
done

echo ""
echo "✅ 转换完成！"
echo ""
echo "📊 文件大小对比:"
echo "原始图片总大小:"
du -ch "$IMAGES_DIR"/*.{jpg,jpeg,JPEG,JPG,png,PNG} 2>/dev/null | tail -1
echo ""
echo "WebP 图片总大小:"
du -ch "$IMAGES_DIR"/*.webp 2>/dev/null | tail -1
