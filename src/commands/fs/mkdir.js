import { mkdir } from "node:fs/promises"

import { isExist } from "../../utils/isExist.js" 
import { logger } from "../../utils/logger.js"

export const createDir = async (dirPath) => {
  try {
    const dirExists = await isExist(dirPath)
    if (dirExists) throw new Error("Directory already exists")

    await mkdir(dirPath, { recursive: true })
    logger.logMagenta(`Directory ${dirPath} created successfully`)
  } catch (error) {
    logger.logRed(`Failed to create directory: ${error.message}`)
  }
}
