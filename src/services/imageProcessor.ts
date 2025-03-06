import { ImageSize } from '../types/image';
import { 
  validateImageType, 
  getOutputFormat, 
  getContentType,
  isVectorFormat
} from '../utils/imageUtils';
import {
  processGif,
  processStandardImage,
  getImageMetadata
} from '../utils/imageResizeUtils';

class ImageProcessor {
  validateImageType(mimeType: string): boolean {
    return validateImageType(mimeType);
  }
  
  getOutputFormat(mimeType: string): string {
    return getOutputFormat(mimeType);
  }
  
  getContentType(mimeType: string): string {
    const outputFormat = this.getOutputFormat(mimeType);
    return getContentType(mimeType, outputFormat);
  }
  
  async analyzeImage(buffer: Buffer): Promise<any> {
    return getImageMetadata(buffer);
  }
  
  async resizeImage(
    buffer: Buffer,
    size: ImageSize,
    mimeType: string
  ): Promise<Buffer> {
    if (size === ImageSize.ORIGINAL) {
      return buffer;
    }
    
    if (isVectorFormat(mimeType)) {
      return buffer;
    }
    
    if (mimeType === 'image/gif') {
      return processGif(buffer, size);
    }
    
    const outputFormat = this.getOutputFormat(mimeType);
    return processStandardImage(buffer, size, outputFormat);
  }
}

export const imageProcessor = new ImageProcessor();
export default imageProcessor;
