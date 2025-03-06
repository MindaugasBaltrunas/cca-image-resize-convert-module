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
  [ImageSize.THUMBNAIL]: { width: 150, height: 150 },
  [ImageSize.SMALL]: { width: 320, height: 320 },
  [ImageSize.MEDIUM]: { width: 640, height: 640 },
  [ImageSize.LARGE]: { width: 1280, height: 1280 }
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
