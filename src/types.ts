export type LogLevels = 'trace' | 'info' | 'debug' | 'warn' | 'error' | 'log'

export const levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
}

export interface LoggerOptions {
  timestamps?: boolean
  colorize?: boolean
  includeLabel?: boolean
}
