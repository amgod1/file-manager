import os from "node:os"
import readline from "node:readline"
import { handler } from "./commands/handler.js" 
import { logger } from "./utils/logger.js"

const args = process.argv.slice(2)
const usernameArg = args.find((arg) => arg.startsWith("--username="))
const username = usernameArg?.split("=")[1] || "Anonymous"

let currentDir = os.homedir()

const printWelcome = () => {
  logger.logBold(`Welcome to the File Manager, ${username}!`)
}

const printCWD = () => {
  logger.logGreen(`You are currently in ${currentDir}`)
}

const exitProgram = () => {
  logger.logBold(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
})

printWelcome()
printCWD()
rl.prompt()

rl.on("line", async (input) => {
  const [command, ...args] = input.trim().split(" ")

  try {
    const { dir, forceExit } = await handler(command, args, currentDir) 
    
    currentDir = dir

    if (forceExit) {
      exitProgram()
    }
  } catch (error) {
    logger.logRed(`Operation failed: ${error.message}`)
  }

  printCWD()
  rl.prompt()
})

process.on("SIGINT", exitProgram)
