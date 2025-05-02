import { rename as rename_fs } from "node:fs/promises"

import { isExist } from "../../utils/isExist.js"
import { logger } from "../../utils/logger.js"

export const rename = async (fromPath, toPath) => {
  try {
    const isFromExist = await isExist(fromPath)
    if (!isFromExist) {
      throw new Error(`Source file does not exist: ${fromPath}`)
    }

    const isToExist = await isExist(toPath)
    if (isToExist) {
      throw new Error(`Destination file already exists: ${toPath}`)
    }

    await rename_fs(fromPath, toPath)
    logger.logMagenta(`File renamed successfully: ${fromPath} -> ${toPath}`)
  } catch (error) {
    logger.logRed(`Failed to rename: ${error.message}`)
  }
}

