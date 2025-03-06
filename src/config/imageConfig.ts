import { ImageSize, ImageDimensions, WebpPreset } from '../types/image';

export const SUPPORTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

export const PRESERVABLE_FORMATS = ['image/gif', 'image/svg+xml'];

export const IMAGE_SIZES: Record<ImageSize, ImageDimensions> = {
  [ImageSize.ORIGINAL]: { width: 0, height: 0 },
  [ImageSize.THUMB]: { width: 100, height: 100 },
  [ImageSize.SM]: { width: 300, height: 300 },
  [ImageSize.MD]: { width: 600, height: 600 },
  [ImageSize.LG]: { width: 900, height: 900 },
  [ImageSize.XL]: { width: 1200, height: 1200 }
};

export const IMAGE_QUALITY = {
  WEBP: {
    quality: 80,
    lossless: false,
    effort: 4,
    nearLossless: false
  },
  JPEG: 85,
  PNG: 9
};

export const WEBP_PRESETS: Record<string, WebpPreset> = {
  PHOTO: {
    quality: 80,
    lossless: false,
    effort: 4,
    nearLossless: false
  },
  GRAPHIC: {
    quality: 90,
    lossless: false,
    effort: 5,
    nearLossless: false
  },
  ICON: {
    quality: 85,
    lossless: false,
    effort: 5,
    nearLossless: true
  },
  TEXT: {
    quality: 90,
    lossless: true,
    effort: 6,
    nearLossless: false
  }
};