export const escapeCode = (styles?: number) => {
  return `\u001b[${styles ? styles + 'm' : 'm'}`
}

export const styles: { [key: string]: { [key: string]: number } } = {
  format: {
    reset: 0,
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4
  },
  color: {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    blackBright: 90,
    gray: 90,
    redBright: 91,
    greenBright: 92,
    yellowBright: 93,
    blueBright: 94,
    magentaBright: 95,
    cyanBright: 96,
    whiteBright: 97
  }
}

export const logStyles: { [key: string]: { color: number; format: number } } = {
  info: {
    color: styles.color.green,
    format: styles.format.bold
  },
  debug: {
    color: styles.color.blue,
    format: styles.format.bold
  },
  warn: {
    color: styles.color.yellow,
    format: styles.format.bold
  },
  error: {
    color: styles.color.red,
    format: styles.format.bold
  },
  trace: {
    color: styles.color.magenta,
    format: styles.format.bold
  }
}
