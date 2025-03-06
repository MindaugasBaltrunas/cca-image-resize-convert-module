import { ImageSize } from './types/image';
import imageProcessor from './services/imageProcessor';

export async function resizeImageAllSizes(
  file: Express.Multer.File
): Promise<Record<ImageSize, Buffer>> {
  const sizes: ImageSize[] = [
    ImageSize.ORIGINAL,
    ImageSize.THUMBNAIL,
    ImageSize.SMALL,
    ImageSize.MEDIUM,
    ImageSize.LARGE,
  ];

  const resizedResults = await Promise.all(
    sizes.map(async (size) => {
      const resizedBuffer = await imageProcessor.resizeImage(
        file.buffer,
        size,
        file.mimetype
      );
      return { size, buffer: resizedBuffer };
    })
  );

  return resizedResults.reduce((acc, { size, buffer }) => {
    acc[size] = buffer;
    return acc;
  }, {} as Record<ImageSize, Buffer>);
}
