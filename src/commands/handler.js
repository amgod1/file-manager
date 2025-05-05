import path from "node:path"

import { logger } from "../utils/logger.js"

export const handler = async (command, args, currentDir) => {
  try {
    let newCurrentDir = currentDir

    switch (command) {
      case "up": {
        const { up } = await import("./navigation/up.js")
        newCurrentDir = up(currentDir)

        break
      }

      case "cd": {
        if (!args[0]) throw new Error("Path required")

        const { cd } = await import("./navigation/cd.js")
        newCurrentDir = await cd(currentDir, args[0])

        break
      }

      case "ls": {
        const { ls } = await import("./navigation/ls.js")
        await ls(currentDir)

        break
      }

      case "add": {
        if (!args[0]) {
          logger.logRed("File name is required")
          return currentDir
        }

        const newFilePath = path.resolve(currentDir, args[0])

        const { create } = await import("./fs/create.js")
        await create(newFilePath)

        break
      }

      case "mkdir": {
        if (!args[0]) {
          logger.logRed("Directory name is required")
          return currentDir
        }

        const newDirPath = path.resolve(currentDir, args[0])

        const { createDir } = await import("./fs/mkdir.js")
        await createDir(newDirPath)

        break
      }

      case "rn": {
        if (args.length < 2) {
          logger.logRed("Both old file path and new filename are required")
          return currentDir
        }

        const oldFilePath = path.resolve(currentDir, args[0])
        const newFileName = args[1]
        const newFilePath = path.resolve(currentDir, newFileName)

        const { rename } = await import("./fs/rename.js")
        await rename(oldFilePath, newFilePath)

        break
      }

      case "rm": {
        if (!args[0]) {
          logger.logRed("File path is required")
          return currentDir
        }

        const filePath = path.resolve(currentDir, args[0])

        const { remove } = await import("./fs/remove.js")
        await remove(filePath)

        break
      }

      case "cat": {
        if (!args[0]) {
          logger.logRed("File path is required")
          return currentDir
        }

        const filePath = path.resolve(currentDir, args[0])

        const { read } = await import("./streams/read.js")
        await read(filePath)

        break
      }

      case "cp": {
        if (args.length < 2) {
          logger.logRed(
            "Both source file path and target directory are required"
          )
          return currentDir
        }

        const sourcePath = path.resolve(currentDir, args[0])
        const targetDir = path.resolve(currentDir, args[1])

        const { copy } = await import("./streams/copy.js")
        await copy(sourcePath, targetDir)

        break
      }

      case "mv": {
        if (args.length < 2) {
          logger.logRed(
            "Both source file path and target directory are required"
          )
          return currentDir
        }

        const sourcePath = path.resolve(currentDir, args[0])
        const targetDir = path.resolve(currentDir, args[1])

        const { move } = await import("./streams/move.js")
        await move(sourcePath, targetDir)

        break
      }

      case "os": {
        if (!args[0]) {
          logger.logRed("Missing OS command flag")
          return
        }

        const { handleOS } = await import("./os/os.js")
        handleOS(args[0])

        break
      }

      case "hash": {
        if (!args[0]) {
          logger.logRed("File path is required")
          return currentDir
        }

        const filePath = path.resolve(currentDir, args[0])

        const { calculateHash } = await import("./hash/calcHash.js")
        await calculateHash(filePath)

        break
      }

      case "compress": {
        if (args.length < 2) {
          logger.logRed(
            "Both source file path and destination path are required"
          )
          return
        }

        const sourcePath = path.resolve(currentDir, args[0])
        const destinationPath = path.resolve(currentDir, args[1])

        const { compress } = await import("./zlib/compress.js")
        await compress(sourcePath, destinationPath)

        break
      }

      case "decompress": {
        if (args.length < 2) {
          logger.logRed(
            "Both source file path and destination path are required"
          )
          return
        }

        const sourcePath = path.resolve(currentDir, args[0])
        const destinationPath = path.resolve(currentDir, args[1])

        const { decompress } = await import("./zlib/decompress.js")
        await decompress(sourcePath, destinationPath)

        break
      }

      case ".exit": {
        return {
          dir: currentDir,
          forceExit: true,
        }
      }

      default: {
        logger.logRed("Invalid input")
      }
    }

    return {
      dir: newCurrentDir,
      forceExit: false,
    }
  } catch (error) {
    logger.logRed(`Error: ${error.message}`)
    return {
      dir: currentDir,
      forceExit: false,
    }
  }
}
