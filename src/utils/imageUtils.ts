import { PRESERVABLE_FORMATS, SUPPORTED_MIME_TYPES } from '../config/imageConfig';

export function validateImageType(mimeType: string): boolean {
  return SUPPORTED_MIME_TYPES.includes(mimeType);
}

export function getOutputFormat(mimeType: string): string {
  if (PRESERVABLE_FORMATS.includes(mimeType)) {
    return mimeType.split('/')[1];
  }
  return 'webp';
}

export function getContentType(mimeType: string, outputFormat: string): string {
  if (PRESERVABLE_FORMATS.includes(mimeType)) {
    return mimeType;
  }
  return `image/${outputFormat}`;
}

export function isAnimatedFormat(mimeType: string): boolean {
  return mimeType === 'image/gif';
}

export function isVectorFormat(mimeType: string): boolean {
  return mimeType === 'image/svg+xml';
}

export function detectImageType(buffer: Buffer): 'PHOTO' | 'GRAPHIC' | 'ICON' | 'TEXT' {
  return 'PHOTO';
}
