import sharp from 'sharp';
import { ImageSize, ImageDimensions } from '../types/image';

const IMAGE_DIMENSIONS: Record<ImageSize, ImageDimensions> = {
  [ImageSize.ORIGINAL]: { width: 0, height: 0 }, 
  [ImageSize.THUMB]: { width: 100, height: 100 },
  [ImageSize.SM]: { width: 300, height: 300 },
  [ImageSize.MD]: { width: 600, height: 600 },
  [ImageSize.LG]: { width: 900, height: 900 },
  [ImageSize.XL]: { width: 1200, height: 1200 },
};

export async function resizeImageAllSizes(
  file: Express.Multer.File
): Promise<Record<ImageSize, Buffer>> {
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

      const { width, height } = IMAGE_DIMENSIONS[size];
      const buffer = await sharp(file.buffer)
        .resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .toBuffer();

      return { size, buffer };
    })
  );

  return resizedBuffers.reduce((acc, { size, buffer }) => {
    acc[size] = buffer;
    return acc;
  }, {} as Record<ImageSize, Buffer>);
}
