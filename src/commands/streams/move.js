import { copy } from "./copy.js" 
import { remove } from "../fs/remove.js"

import { logger } from "../../utils/logger.js"

export const move = async (sourcePath, targetDir) => {
  try {

    await copy(sourcePath, targetDir)
    await remove(sourcePath)

    logger.logMagenta(`File moved successfully: ${sourcePath} -> ${targetDir}`)
  } catch (error) {
    logger.logRed(`Failed to move file: ${error.message}`)
  }
}
