import uuid from '@teensy/uuid'
import { LogLevels, LoggerOptions, Levels } from './types.js'
import { escapeCode, logStyles } from './styles.js'

export default class Logger {
  private levels: string[] = Object.keys(Levels);
  [index: string]: any

  constructor(options: LoggerOptions = {}) {
    this.timestamps = options.timestamps ?? false
    this.colorize = options.colorize ?? true
    this.prefix = options.label ?? true
    this.id = options.id ?? true

    for (const level of this.levels) {
      this[level] = this.attach.bind(this, level as LogLevels)
    }
  }

  private attach(method: LogLevels, ...message: unknown[]): void {
    const id = this.id ? uuid() : undefined
    const timestamp = this.timestamps ? this.generateTimestamp() : undefined
    const prefix = this.generatePrefix(method)
    const colorizedPrefix = `${escapeCode(
      logStyles[method].color
    )}${prefix}${escapeCode()}`

    console[method](
      `${this.colorize ? colorizedPrefix : prefix}:`,
      ...message,
      ...(timestamp ? [{ timestamp }] : []),
      ...(id ? [{ id }] : [])
    )
  }

  private generatePrefix(method: LogLevels) {
    const prefix = `[${method.toUpperCase()}]`
    return prefix
  }

  private generateTimestamp() {
    return new Date().toJSON()
  }
}
