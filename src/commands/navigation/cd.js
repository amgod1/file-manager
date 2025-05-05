import { stat } from "fs/promises"
import { resolve, sep } from "node:path"
import { platform } from "node:os"

export const cd = async (currentDir, newPath) => {
  try {
    let targetPath

    if (platform() === "win32" && /^[a-zA-Z]:[\\/]?$/.test(newPath)) {
      const normalizedDrive = newPath.endsWith(sep) ? newPath : newPath + sep
      targetPath = normalizedDrive
    } else {
      targetPath = resolve(currentDir, newPath)
    }

    const stats = await stat(targetPath)
    if (!stats.isDirectory()) {
      throw new Error("Not a directory")
    }

    return targetPath
  } catch (error) {
    throw new Error("Invalid path")
  }
}
