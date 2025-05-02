import { appendFile } from "node:fs/promises"

import { isExist } from "../../utils/isExist.js"
import { logger } from "../../utils/logger.js"

export const create = async (filePath, data = '') => {
  try {
    const isFileExist = await isExist(filePath)
    if (isFileExist) throw new Error("File already exists")

    await appendFile(filePath, data)
    logger.logMagenta(`File ${filePath} created successfully`)
  } catch (error) {
    logger.logRed(`Failed to create directory: ${error.message}`)
  }
}
