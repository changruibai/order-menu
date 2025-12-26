/**
 * 图片压缩工具
 * 在上传前压缩图片，减小体积
 */

interface CompressOptions {
  maxWidth?: number;      // 最大宽度，默认 800px
  maxHeight?: number;     // 最大高度，默认 600px
  quality?: number;       // 压缩质量 0-1，默认 0.8
  maxSizeKB?: number;     // 最大文件大小 KB，默认 100KB
}

const DEFAULT_OPTIONS: Required<CompressOptions> = {
  maxWidth: 800,
  maxHeight: 600,
  quality: 0.8,
  maxSizeKB: 100
};

/**
 * 压缩图片文件
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // 如果图片已经小于目标大小，直接返回
  if (file.size <= opts.maxSizeKB * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // 计算压缩后的尺寸
      let { width, height } = img;
      
      if (width > opts.maxWidth) {
        height = (height * opts.maxWidth) / width;
        width = opts.maxWidth;
      }
      
      if (height > opts.maxHeight) {
        width = (width * opts.maxHeight) / height;
        height = opts.maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // 绘制压缩后的图片
      ctx?.drawImage(img, 0, 0, width, height);

      // 递归压缩直到达到目标大小
      let quality = opts.quality;
      
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('压缩失败'));
              return;
            }

            // 如果还是太大且质量还能降低
            if (blob.size > opts.maxSizeKB * 1024 && quality > 0.3) {
              quality -= 0.1;
              tryCompress();
              return;
            }

            // 创建压缩后的文件
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });

            console.log(
              `图片压缩: ${(file.size / 1024).toFixed(1)}KB -> ${(compressedFile.size / 1024).toFixed(1)}KB (质量: ${(quality * 100).toFixed(0)}%)`
            );

            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };

      tryCompress();
    };

    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * 压缩 base64 图片
 */
export async function compressBase64Image(
  base64: string,
  options: CompressOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // 计算压缩后的尺寸
      let { width, height } = img;
      
      if (width > opts.maxWidth) {
        height = (height * opts.maxWidth) / width;
        width = opts.maxWidth;
      }
      
      if (height > opts.maxHeight) {
        width = (width * opts.maxHeight) / height;
        height = opts.maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      // 绘制压缩后的图片
      ctx?.drawImage(img, 0, 0, width, height);

      // 输出压缩后的 base64
      const compressedBase64 = canvas.toDataURL('image/jpeg', opts.quality);
      
      console.log(
        `Base64 图片压缩: ${(base64.length / 1024).toFixed(1)}KB -> ${(compressedBase64.length / 1024).toFixed(1)}KB`
      );

      resolve(compressedBase64);
    };

    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = base64;
  });
}

