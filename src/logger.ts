import uuid from '@teensy/uuid'
import type { LogLevels, LoggerOptions, IndexSignature } from './types.js'
import { escapeCode, logStyles } from './styles.js'

export const Levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
}

const defaultOptions: LoggerOptions = {
  timestamp: true,
  colorize: true,
  prefix: true,
  id: true,
  alias: 'root'
}

const defaultChildOptions: LoggerOptions = {
  ...defaultOptions,
  alias: 'child'
}

export default class Logger implements IndexSignature {
  private levels: string[] = Object.keys(Levels)
  private timestamp?: boolean
  private colorize?: boolean
  private prefix?: boolean
  private id?: boolean
  private alias?: string;
  [index: string]: any

  constructor(opts: LoggerOptions = defaultOptions) {
    this.timestamp = opts.timestamp ?? defaultOptions.timestamp
    this.colorize = opts.colorize ?? defaultOptions.colorize
    this.prefix = opts.prefix ?? defaultOptions.prefix
    this.id = opts.id ?? defaultOptions.id
    this.alias = opts.alias ?? defaultOptions.alias

    for (const level of this.levels) {
      this[level] = this.attach.bind(this, level as LogLevels)
    }
  }

  private attach(method: LogLevels, ...message: unknown[]): void {
    const prefix = this.prefix ? this.generatePrefix(method) : undefined
    const colorizedPrefix =
      prefix && this.colorize
        ? this.colorizeString(prefix, logStyles[method].color)
        : prefix

    return console[method](
      prefix ? `${colorizedPrefix ? colorizedPrefix : prefix}:` : [],
      { alias: this.alias },
      ...message,
      ...(this.timestamp ? [{ timestamp: this.generateTimestamp() }] : []),
      ...(this.id ? [{ id: uuid() }] : [])
    )
  }

  public createChild = (
    alias: string,
    opts: LoggerOptions = defaultChildOptions
  ): Logger => {
    return new Logger({ alias, ...opts })
  }

  private generatePrefix(method: LogLevels): string {
    return this.bracketize(method.toUpperCase())
  }

  private generateTimestamp(): string {
    return new Date().toJSON()
  }

  private colorizeString(str: string, color: number): string {
    return `${escapeCode(color)}${str}${escapeCode()}`
  }

  private bracketize(str: string): string {
    return `[${str}]`
  }
}
