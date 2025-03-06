import sharp from 'sharp';
import { ImageSize, ImageDimensions } from '../types/image';
import { IMAGE_SIZES } from '../config/imageConfig';
import { validateImageType } from '../utils/imageUtils';

export async function resizeImageAllSizes(
  file: Express.Multer.File
): Promise<Record<ImageSize, Buffer>> {
  const buffer = file.buffer;
  const mimeType = file.mimetype;
  
  if (!validateImageType(mimeType)) {
    throw new Error(`Unsupported image type: ${mimeType}`);
  }
  
  const sizes: ImageSize[] = [
    ImageSize.ORIGINAL,
    ImageSize.THUMB,
    ImageSize.SM,
    ImageSize.MD,
    ImageSize.LG,
    ImageSize.XL,
  ];

  const resizedBuffers = await Promise.all(
    sizes.map(async (size) => {
      if (size === ImageSize.ORIGINAL) {
        return { size, buffer: file.buffer };
      }

      const dimensions = IMAGE_SIZES[size];
      const resizedBuffer = await sharp(file.buffer)
        .resize(dimensions.width, dimensions.height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toBuffer();

      return { size, buffer: resizedBuffer };
    })
  );

  return resizedBuffers.reduce((acc, { size, buffer }) => {
    acc[size] = buffer;
    return acc;
  }, {} as Record<ImageSize, Buffer>);
}