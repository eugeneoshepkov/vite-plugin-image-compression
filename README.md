# Vite Image Compression Plugin

A Vite plugin to compress images (JPEG and PNG) during the build process using imagemin.

## Installation

```bash
npm i -D vite-plugin-image-compression
```

## Usage

Import and use the plugin in your Vite configuration file (usually `vite.config.ts`):

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import imageCompressionPlugin from 'vite-plugin-image-compression';

export default defineConfig({
  plugins: [imageCompressionPlugin()],
});
```

By default, the plugin compresses JPEG and PNG images located in the "assets" folder and saves the compressed images in a "compressed" subfolder during the build process.

## Configuration

The plugin accepts custom settings for both `imagemin-pngquant` and `imagemin-mozjpeg`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import imageCompressionPlugin from 'vite-plugin-image-compression';

export default defineConfig({
  plugins: [
    imageCompressionPlugin({
      pngquantOptions: { quality: [0.5, 0.7] },
      mozjpegOptions: { quality: 80 },
    }),
  ],
});
```

In this example, we've provided custom settings for both `pngquant` and `mozjpeg`. You can adjust the settings according to your needs.

## License

MIT License