export enum ImageSize {
    ORIGINAL = 'original',
    THUMBNAIL = 'thumbnail',
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large'
  }
  
  export interface ImageDimensions {
    width: number;
    height: number;
  }
  
  export interface ImageProcessOptions {
    quality?: number;
    lossless?: boolean;
    effort?: number;
  }
  
  export interface WebpPreset {
    quality: number;
    lossless: boolean;
    effort: number;
    nearLossless: boolean;
  }
  