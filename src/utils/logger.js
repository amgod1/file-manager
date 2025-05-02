const styleMessage = (message, color, style) =>
  `${color}${style}${message}\x1b[0m`

const createLogFunction =
  (color, style = "") =>
  (message) =>
    console.log(styleMessage(message, color, style))

const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  underline: "\x1b[4m",
}

export const logger = {
  log: (message, color = colors.reset, style = "") => {
    console.log(styleMessage(message, color, style))
  },

  logRed: createLogFunction(colors.red),
  logGreen: createLogFunction(colors.green),
  logYellow: createLogFunction(colors.yellow),
  logBlue: createLogFunction(colors.blue),
  logMagenta: createLogFunction(colors.magenta),
  logCyan: createLogFunction(colors.cyan),
  logWhite: createLogFunction(colors.white),

  logBold: (message) =>
    console.log(styleMessage(message, colors.reset, colors.bold)),
  logUnderlined: (message) =>
    console.log(styleMessage(message, colors.reset, colors.underline)),
}
