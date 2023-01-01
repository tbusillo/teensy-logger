import { describe, it, expect } from '@jest/globals'
import Logger from '../src/logger'

const defaultOptions = {
  timestamp: false,
  colorize: false,
  label: true,
  id: false,
  alias: 'test'
}

const uuidPattern = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
)

describe('logger', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('handles info()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'info')

    logger.info('testing 1 2 3')

    expect(spy).toHaveBeenCalledWith(
      '[INFO]:',
      { alias: 'test' },
      'testing 1 2 3'
    )
  })

  it('handles debug()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'debug')

    logger.debug('testing 1 2 3')

    expect(spy).toHaveBeenCalledWith(
      '[DEBUG]:',
      { alias: 'test' },
      'testing 1 2 3'
    )
  })

  it('handles warn()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'warn')

    logger.warn('warning 1 2 3')

    expect(spy).toHaveBeenCalledWith(
      '[WARN]:',
      { alias: 'test' },
      'warning 1 2 3'
    )
  })

  it('handles error()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'error')

    logger.error('error 1 2 3')

    expect(spy).toHaveBeenCalledWith(
      '[ERROR]:',
      { alias: 'test' },
      'error 1 2 3'
    )
  })

  it('handles trace()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'trace')

    logger.trace('pity party 1 2 3')

    expect(spy).toHaveBeenCalledWith(
      '[TRACE]:',
      { alias: 'test' },
      'pity party 1 2 3'
    )
  })

  describe('handles being called with', () => {
    it('an object', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'info')

      logger.info({ message: 'logged event example' })

      expect(spy).toHaveBeenCalledWith(
        '[INFO]:',
        { alias: 'test' },
        {
          message: 'logged event example'
        }
      )
    })

    it('an array of various prototypes', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'info')

      logger.info({
        message: 'logged event example',
        arr: [1, 2, 3, 4, 'foo', 'bar', false]
      })

      expect(spy).toHaveBeenCalledWith(
        '[INFO]:',
        { alias: 'test' },
        {
          message: 'logged event example',
          arr: [1, 2, 3, 4, 'foo', 'bar', false]
        }
      )
    })

    it('an Error', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'error')

      logger.error(new Error('logged event example'))

      expect(spy).toBeCalledWith(
        '[ERROR]:',
        { alias: 'test' },
        new Error('logged event example')
      )
    })
  })

  describe('handles custom options', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('timestamps: true', () => {
      const logger = new Logger({ ...defaultOptions, timestamp: true })
      const date = new Date().toJSON()
      const spy = jest.spyOn(console, 'info')

      logger.info('logged event example')

      expect(spy).toBeCalledWith(
        '[INFO]:',
        { alias: defaultOptions.alias },
        'logged event example',
        {
          timestamp: date
        }
      )
    })

    it('id: true', () => {
      const logger = new Logger({ ...defaultOptions, id: true })
      const spy = jest.spyOn(console, 'info')

      logger.info('logged event example')

      expect(spy).toBeCalledWith(
        '[INFO]:',
        { alias: 'test' },
        'logged event example',
        expect.objectContaining({ id: expect.stringMatching(uuidPattern) })
      )
    })
  })

  describe('createChild', () => {
    it('creates a child logger', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'info')
      const childLogger = logger.createChild('child', {
        timestamp: false,
        colorize: false,
        id: false
      })

      childLogger.info('child logger')

      expect(childLogger).toBeInstanceOf(Logger)
      expect(spy).toBeCalledWith('[INFO]:', { alias: 'child' }, 'child logger')
    })

    it('creates a child logger with custom options', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'info')
      const childLogger = logger.createChild('child', {
        timestamp: true,
        colorize: false,
        id: false
      })

      childLogger.info('child logger')

      expect(childLogger).toBeInstanceOf(Logger)
      expect(spy).toBeCalledWith(
        '[INFO]:',
        { alias: 'child' },
        'child logger',
        { timestamp: expect.any(String) }
      )
    })
  })
})
