export type LogLevel = 'trace' | 'info' | 'debug' | 'warn' | 'error'

export const levelPrecedence: Record<number, LogLevel> = {
  0: 'error',
  1: 'warn',
  2: 'info',
  3: 'debug',
  4: 'trace'
}
