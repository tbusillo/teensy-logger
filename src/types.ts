export type LogLevels = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'log'

export interface IndexSignature {
  [index: string | symbol]: any
}

export const Levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
}

export interface LoggerOptions {
  timestamp?: boolean
  colorize?: boolean
  prefix?: boolean
  id?: boolean
  alias?: string
  [index: string]: any
}

export interface DefaultOptions {
  timestamp: boolean
  colorize: boolean
  prefix: boolean
  id: boolean
  alias: string
}
