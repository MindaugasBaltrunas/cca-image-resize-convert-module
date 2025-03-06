export enum ImageSize {
  ORIGINAL = "original",
  THUMB = "thumb",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl"
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
