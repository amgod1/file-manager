import { createReadStream, createWriteStream } from "node:fs"
import { createBrotliCompress } from "node:zlib"
import { pipeline } from "node:stream/promises"

import { logger } from "../../utils/logger.js"

export const compress = async (sourcePath, destinationPath) => {
  try {
    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(destinationPath)
    const brotli = createBrotliCompress()

    await pipeline(readStream, brotli, writeStream)

    logger.logMagenta(`File compressed successfully to ${destinationPath}`)
  } catch (err) {
    logger.logRed(`Compression failed: ${err.message}`)
  }
}
