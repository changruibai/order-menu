import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { compressImage, compressBase64Image } from '../utils/imageCompressor';

// 图片存储桶名称
const BUCKET_NAME = 'dish-images';

// 存储服务
export const storageService = {
  // 上传图片（自动压缩）
  async uploadImage(file: File): Promise<string | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase 未配置，无法上传图片');
      return null;
    }

    try {
      // 压缩图片（目标: 800x600, 最大 100KB）
      const compressedFile = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        maxSizeKB: 100
      });

      // 生成唯一文件名（统一用 jpg）
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
      const filePath = `dishes/${fileName}`;

      // 上传文件
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, compressedFile, {
          contentType: 'image/jpeg',
          cacheControl: '31536000', // 1年缓存
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 获取公开 URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('上传图片失败:', error);
      return null;
    }
  },

  // 从 base64 上传图片（自动压缩）
  async uploadBase64Image(base64: string): Promise<string | null> {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase 未配置，无法上传图片');
      return null;
    }

    try {
      // 压缩 base64 图片
      const compressedBase64 = await compressBase64Image(base64, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        maxSizeKB: 100
      });

      // 解析压缩后的 base64
      const matches = compressedBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        throw new Error('无效的 base64 格式');
      }

      const base64Data = matches[2];
      const buffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

      // 生成唯一文件名（统一用 jpg）
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
      const filePath = `dishes/${fileName}`;

      // 上传文件
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
          contentType: 'image/jpeg',
          cacheControl: '31536000', // 1年缓存
          upsert: false
        });

      if (uploadError) throw uploadError;

      // 获取公开 URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('上传 base64 图片失败:', error);
      return null;
    }
  },

  // 删除图片
  async deleteImage(imageUrl: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;

    try {
      // 从 URL 提取文件路径
      const url = new URL(imageUrl);
      const pathMatch = url.pathname.match(/\/storage\/v1\/object\/public\/dish-images\/(.+)/);
      if (!pathMatch) return false;

      const filePath = pathMatch[1];

      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([filePath]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('删除图片失败:', error);
      return false;
    }
  }
};
