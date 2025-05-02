import { createReadStream } from "node:fs"

import { logger } from "../../utils/logger.js"

export const read = async (readPath) => {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(readPath, { encoding: "utf8" })

    stream.on("data", (chunk) => {
      process.stdout.write(chunk)
    })

    stream.on("end", () => {
      logger.logMagenta("\n\nFile reading complete.")
      resolve()
    })

    stream.on("error", (error) => {
      logger.logRed(`Error reading file: ${error.message}`)
      reject(error)
    })
  })
}
