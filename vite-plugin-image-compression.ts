// vite-plugin-image-compression.ts
import { promises as fs } from "fs";
import { join } from "path";
import imagemin from "imagemin";
import imageminPngquant, {
  Options as PngQuantOptions,
} from "imagemin-pngquant";
import imageminMozjpeg, { Options } from "imagemin-mozjpeg";
import { Plugin as VitePlugin } from "vite";

interface ImageCompressionPluginOptions {
  pngquantOptions?: PngQuantOptions;
  mozjpegOptions?: Options;
}

function imageCompressionPlugin(
  options: ImageCompressionPluginOptions = {}
): VitePlugin {
  const defaultPngquantOptions: PngQuantOptions = {
    quality: [0.6, 0.8],
  };
  const defaultMozjpegOptions: Options = { quality: 75 };

  const config = {
    plugins: [
      imageminPngquant(options.pngquantOptions || defaultPngquantOptions),
      imageminMozjpeg(options.mozjpegOptions || defaultMozjpegOptions),
    ],
  };

  return {
    name: "image-compression",
    async writeBundle(_, output: any) {
      const assetsPath = join(output.dir, "assets");
      const imageFiles = await fs.readdir(assetsPath);
      const compressedImages = imageFiles.filter((file) =>
        /\.(jpe?g|png)$/i.test(file)
      );

      for (const imageFile of compressedImages) {
        const inputPath = join(assetsPath, imageFile);
        const outputPath = join(assetsPath, "compressed");
        await fs.mkdir(outputPath, { recursive: true });

        await imagemin([inputPath], {
          destination: outputPath,
          plugins: config.plugins,
        });
      }
    },
  };
}

export default imageCompressionPlugin;
