import { createHash } from "node:crypto"
import { createReadStream } from "node:fs"

import { logger } from "../../utils/logger.js"

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256")
  const input = createReadStream(filePath)

  await new Promise((resolve, reject) => {
    input.on("data", (chunk) => {
      hash.update(chunk)
    })

    input.on("end", () => {
      const finalHash = hash.digest("hex")
      logger.logMagenta(`SHA-256 Hash: ${finalHash}`)
      resolve()
    })

    input.on("error", (error) => {
      logger.logRed(error)
      reject(error)
    })
  })
}
