import uuid from '@teensy/uuid'
import { LogLevels, LoggerOptions, levels } from './types.js'
import { escapeCode, logStyles } from './styles.js'
export default class Logger {
  private levels: string[] = Object.keys(levels);
  [key: string]: any

  constructor(options: LoggerOptions = {}) {
    this.timestamps = options.timestamps ?? false
    this.colorize = options.colorize ?? true
    this.includeLabel = options.includeLabel ?? true
    this.id = uuid()

    for (const level of this.levels) {
      this[level] = this.log.bind(this, level as LogLevels)
    }
  }

  log(method: LogLevels, ...message: unknown[]) {
    const timestamp = this.timestamps ? new Date().toJSON() : undefined
    const label = `[${method.toUpperCase()}]`
    const colorizedLabel = `${escapeCode(
      logStyles[method].color
    )}${label}${escapeCode()}`

    console[method](
      `${this.colorize ? colorizedLabel : label}:`,
      ...message,
      ...(timestamp ? [{ timestamp }] : []),
      { id: this.id }
    )
  }
}
