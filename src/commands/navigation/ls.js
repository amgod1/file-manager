import { readdir } from "node:fs/promises"

export const ls = async (currentDir) => {
  try {
    const files = await readdir(currentDir, { withFileTypes: true })

    const folders = files
      .filter((f) => f.isDirectory())
      .map((f) => ({ Name: f.name, Type: "directory" }))

    const fileList = files
      .filter((f) => f.isFile())
      .map((f) => ({ Name: f.name, Type: "file" }))

    const output = [...folders, ...fileList].sort((a, b) =>
      a.Name.localeCompare(b.Name)
    )
    console.table(output)
  } catch {
    throw new Error("Operation failed")
  }
}
