import { unlink } from "node:fs/promises"

import { isExist } from "../../utils/isExist.js"
import { logger } from "../../utils/logger.js"

export const remove = async (filePath) => {
  try {
    const isFileExist = await isExist(filePath)
    if (!isFileExist) throw new Error("Directory doesn't exist")

    await unlink(filePath)
    logger.logMagenta(`Directory ${filePath} removed successfully`)
  } catch (error) {
    logger.logRed(error)
  }
}
