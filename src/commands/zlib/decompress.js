import { createReadStream, createWriteStream } from "node:fs"
import { createBrotliDecompress } from "node:zlib"
import { pipeline } from "node:stream/promises"

import { logger } from "../../utils/logger.js"

export const decompress = async (sourcePath, destinationPath) => {
  try {
    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(destinationPath)
    const brotli = createBrotliDecompress()

    await pipeline(readStream, brotli, writeStream)

    logger.logMagenta(`File decompressed successfully to ${destinationPath}`)
  } catch (err) {
    logger.logRed(`Decompression failed: ${err.message}`)
  }
}
