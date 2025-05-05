import path from "node:path"

export const up = (currentDir) => {
  const parentDir = path.dirname(currentDir)

  if (parentDir !== currentDir && path.parse(currentDir).root !== currentDir) {
    return parentDir
  }

  return currentDir
}
