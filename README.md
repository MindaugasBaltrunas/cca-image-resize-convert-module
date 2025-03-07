# Image Processing Utility

A powerful TypeScript/JavaScript utility for processing, resizing, and optimizing images with built-in support for multiple formats and intelligent optimization presets.

## Features

- Resize images to multiple predefined sizes in a single operation
- Support for JPEG, PNG, GIF, WebP, and SVG formats
- Preserve animations in GIF files
- Special handling for vector formats (SVG)
- Intelligent WebP optimization with format-specific presets
- Consistent API for image processing operations

## Installation

```bash
npm install cca-image-resize-convert-module

```

Or using yarn:

```bash
yarn add cca-image-resize-convert-module

```

## Usage

### Resizing an Image to All Defined Sizes

```typescript
import { resizeImageAllSizes } from 'cca-image-resize-convert-module';
import express from 'express';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Resize the uploaded image to all predefined sizes
    const resizedImages = await resizeImageAllSizes(req.file);
      
    // Process further or save to storage...
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Using the ImageProcessor Service

```typescript
import { imageProcessor, ImageSize } from 'image-processing-utility';
import fs from 'fs/promises';

async function processMyImage() {
  // Read an image file
  const buffer = await fs.readFile('path/to/image.jpg');
  const mimeType = 'image/jpeg';
  
  // Validate the image type
  if (!imageProcessor.validateImageType(mimeType)) {
    throw new Error('Unsupported image type');
  }
  
  // Get image metadata
  const metadata = await imageProcessor.analyzeImage(buffer);
  console.log(`Image dimensions: ${metadata.width}x${metadata.height}`);
  
  // Resize to medium size
  const resizedBuffer = await imageProcessor.resizeImage(
    buffer,
    ImageSize.MD,
    mimeType
  );
  
  // Get the content type for the output format
  const contentType = imageProcessor.getContentType(mimeType);
  
  // Save or use the resized image...
  await fs.writeFile('path/to/output.webp', resizedBuffer);
}
```

## API Reference

### `resizeImageAllSizes(file: Express.Multer.File): Promise<Record<ImageSize, Buffer>>`

Resizes an image to all predefined sizes and returns a record with size keys mapping to image buffers.

**Parameters:**
- `file`: An Express.Multer.File object containing the image file buffer and metadata

**Returns:**
- A Promise that resolves to a Record with ImageSize keys and Buffer values

**Throws:**
- Error if the image type is not supported

### `imageProcessor`

A singleton instance of the ImageProcessor class that provides methods for processing images.

#### Methods

**`validateImageType(mimeType: string): boolean`**
- Checks if the provided MIME type is supported
- Returns `true` if supported, `false` otherwise

**`getOutputFormat(mimeType: string): string`**
- Determines the output format based on input MIME type
- Returns the format string (e.g., 'webp', 'jpeg', 'png')

**`getContentType(mimeType: string): string`**
- Gets the content type for the output format
- Returns a content type string (e.g., 'image/webp')

**`analyzeImage(buffer: Buffer): Promise<any>`**
- Analyzes an image and returns its metadata
- Returns a Promise that resolves to image metadata

**`resizeImage(buffer: Buffer, size: ImageSize, mimeType: string): Promise<Buffer>`**
- Resizes an image to the specified size
- Parameters:
  - `buffer`: The input image buffer
  - `size`: The target size (from ImageSize enum)
  - `mimeType`: The MIME type of the input image
- Returns a Promise that resolves to a buffer containing the resized image

## Predefined Sizes

The library includes the following predefined sizes:

| Size Name | Dimensions |
|-----------|------------|
| ORIGINAL  | Original dimensions |
| THUMB     | 100 × 100 |
| SM        | 300 × 300 |
| MD        | 600 × 600 |
| LG        | 900 × 900 |
| XL        | 1200 × 1200 |

Images are resized to fit within these dimensions while maintaining aspect ratio.

## Supported Formats

- JPEG (image/jpeg)
- PNG (image/png)
- GIF (image/gif) - Animations are preserved
- WebP (image/webp)
- SVG (image/svg+xml) - Vector format is preserved

## WebP Optimization

The library uses intelligent WebP optimization with different presets for:

- Photos: Balanced quality for photographic content
- Graphics: Higher quality for graphic designs
- Icons: Near-lossless mode for icon preservation
- Text: Lossless mode for text clarity

## License

MIT