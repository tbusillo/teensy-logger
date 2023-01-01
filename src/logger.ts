import uuid from '@teensy/uuid'
import {
  LogLevels,
  LoggerOptions,
  Levels,
  IndexSignature,
  DefaultOptions
} from './types.js'
import { escapeCode, logStyles } from './styles.js'

const defaultOptions: DefaultOptions = {
  timestamp: true,
  colorize: true,
  prefix: true,
  id: true,
  alias: 'root'
}

const defaultChildOptions: DefaultOptions = {
  timestamp: true,
  colorize: true,
  prefix: true,
  id: true,
  alias: 'child'
}

export default class Logger implements IndexSignature {
  private levels: string[] = Object.keys(Levels)
  private timestamp?: boolean
  private colorize?: boolean
  private prefix?: boolean
  private id?: boolean
  private alias: string;
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
    const id = this.id ? uuid() : undefined
    const timestamp = this.timestamp ? this.generateTimestamp() : undefined
    const prefix = this.prefix ? this.generatePrefix(method) : undefined
    const colorizedPrefix =
      prefix && this.colorize
        ? this.colorizeString(prefix, logStyles[method].color)
        : prefix

    return console[method](
      prefix ? `${colorizedPrefix ? colorizedPrefix : prefix}:` : [],
      { alias: this.alias },
      ...message,
      ...(timestamp ? [{ timestamp }] : []),
      ...(id ? [{ id }] : [])
    )
  }

  public createChild = (
    alias: string,
    opts: LoggerOptions = defaultChildOptions
  ): Logger => {
    return new Logger({ alias, ...opts })
  }

  private generatePrefix(method: LogLevels) {
    return this.bracketize(method.toUpperCase())
  }

  private generateTimestamp() {
    return new Date().toJSON()
  }

  private colorizeString(str: string, color: number) {
    return `${escapeCode(color)}${str}${escapeCode()}`
  }

  private bracketize(str: string) {
    return `[${str}]`
  }
}

const logger = new Logger({ colorize: true, timestamps: true, id: true })
logger.debug({ message: 'logged event example' })

const childLogger = logger.createChild('child')
childLogger.debug({ message: 'logged event example' })
childLogger.info({ message: 'logged event example' })
logger.warn({ message: 'does this still work?' })
logger.error({ message: 'here is an error' })
childLogger.trace({ message: 'here is a trace' })
