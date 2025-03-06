import sharp from 'sharp';
import { ImageSize, WebpPreset } from '../types/image';
import { IMAGE_SIZES, IMAGE_QUALITY, WEBP_PRESETS } from '../config/imageConfig';
import { detectImageType } from './imageUtils';

export async function processGif(
  buffer: Buffer,
  size: ImageSize
): Promise<Buffer> {
  const dimensions = IMAGE_SIZES[size];
  return sharp(buffer, { animated: true })
    .resize(dimensions.width, dimensions.height, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .gif()
    .toBuffer();
}

export async function processStandardImage(
  buffer: Buffer,
  size: ImageSize,
  outputFormat: string
): Promise<Buffer> {
  const dimensions = IMAGE_SIZES[size];
  const sharpInstance = sharp(buffer).resize(dimensions.width, dimensions.height, {
    fit: 'inside',
    withoutEnlargement: true
  });

  switch (outputFormat) {
    case 'webp': {
      const imageType = detectImageType(buffer);
      const preset: WebpPreset = WEBP_PRESETS[imageType];
      return sharpInstance
        .webp({
          quality: preset.quality || 80,
          lossless: preset.lossless || false,
          effort: preset.effort || 4,
          nearLossless: preset.nearLossless || false
        })
        .toBuffer();
    }
    case 'jpeg':
      return sharpInstance
        .jpeg({ quality: IMAGE_QUALITY.JPEG })
        .toBuffer();
    case 'png':
      return sharpInstance
        .png({ compressionLevel: IMAGE_QUALITY.PNG })
        .toBuffer();
    default:
      return sharpInstance.toBuffer();
  }
}

export async function getImageMetadata(buffer: Buffer): Promise<sharp.Metadata> {
  return sharp(buffer).metadata();
}