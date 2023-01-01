export type LogLevels = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'log'

export interface IndexSignature {
  [index: string | symbol]: any
}

export interface LoggerOptions {
  timestamp?: boolean
  colorize?: boolean
  prefix?: boolean
  id?: boolean
  alias?: string
  [index: string]: string | boolean | undefined
}
