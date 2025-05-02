import { createReadStream, createWriteStream } from "node:fs"
import { basename, resolve } from "node:path"

import { isExist } from "../../utils/isExist.js"
import { logger } from "../../utils/logger.js"

export const copy = async (sourcePath, targetDir) => {
  try {
    const exists = await isExist(sourcePath)
    if (!exists) throw new Error("Source file does not exist")

    const fileName = basename(sourcePath)
    const targetPath = resolve(targetDir, fileName)

    const targetExists = await isExist(targetPath)
    if (targetExists) throw new Error("Target file already exists")

    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(targetPath)

    return new Promise((resolvePromise, rejectPromise) => {
      readStream.on("error", (err) => {
        logger.logRed("Error reading source file")
        rejectPromise(err)
      })

      writeStream.on("error", (err) => {
        logger.logRed("Error writing to destination")
        rejectPromise(err)
      })

      writeStream.on("finish", () => {
        logger.logMagenta(`File copied successfully to ${targetPath}`)
        resolvePromise()
      })

      readStream.pipe(writeStream)
    })
  } catch (err) {
    logger.logRed(`Copy operation failed: ${err.message}`)
  }
}
