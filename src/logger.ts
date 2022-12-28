// const trace = (...message: unknown[]) => console.trace('[TRACE]: ', ...message)
// const info = (...message: unknown[]) => console.info('[INFO]: ', ...message)
// const debug = (...message: unknown[]) => console.debug('[DEBUG]: ', ...message)
// const warn = (...message: unknown[]) => console.warn('[WARN]: ', ...message)
// const error = (...message: unknown[]) => console.error('[ERROR]: ', ...message)

import { LogLevels, LoggerOptions, levels } from './types'
import { escapeCode, logStyles } from './styles'

export class Logger {
  private levels: string[] = Object.keys(levels);
  [key: string]: any

  constructor(options: LoggerOptions = {}) {
    this.timestamps = options.timestamps ?? false
    this.colorize = options.colorize ?? true
    this.includeLabel = options.includeLabel ?? true

    for (const level of this.levels) {
      this[level] = this.log.bind(this, level as LogLevels)
    }
  }

  log(method: LogLevels, ...message: unknown[]) {
    const timestamp = this.timestamps ? new Date().toJSON() : ''
    const label = `[${method.toUpperCase()}]`
    const colorizedLabel = `${escapeCode(
      logStyles[method].color
    )}${label}${escapeCode()}`

    console[method](
      `${this.colorize ? colorizedLabel : label}:`,
      ...message,
      ...(timestamp ? [timestamp] : [])
    )
  }
}
