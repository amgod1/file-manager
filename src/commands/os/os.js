import os from "node:os"
import { logger } from "../../utils/logger.js"

export const handleOS = (flag) => {
  switch (flag) {
    case "--EOL":
      logger.logMagenta(`EOL: ${JSON.stringify(os.EOL)}`)
      break

    case "--cpus":
      const cpus = os.cpus()
      logger.logMagenta(`Total CPUs: ${cpus.length}`)
      cpus.forEach((cpu, index) => {
        logger.logMagenta(
          `CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`
        )
      })
      break

    case "--homedir":
      logger.logMagenta(`Home directory: ${os.homedir()}`)
      break

    case "--username":
      logger.logMagenta(`System username: ${os.userInfo().username}`)
      break

    case "--architecture":
      logger.logMagenta(`CPU architecture: ${os.arch()}`)
      break

    default:
      logger.logRed("Invalid OS command flag")
  }
}
