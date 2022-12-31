import { describe, it, expect } from '@jest/globals'
import Logger from '../src/logger'

const defaultOptions = {
  timestamps: false,
  colorize: false,
  label: true,
  id: false
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

    expect(spy).toHaveBeenCalledWith('[INFO]:', 'testing 1 2 3')
  })

  it('handles debug()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'debug')

    logger.debug('testing 1 2 3')

    expect(spy).toHaveBeenCalledWith('[DEBUG]:', 'testing 1 2 3')
  })

  it('handles warn()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'warn')

    logger.warn('warning 1 2 3')

    expect(spy).toHaveBeenCalledWith('[WARN]:', 'warning 1 2 3')
  })

  it('handles error()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'error')

    logger.error('error 1 2 3')

    expect(spy).toHaveBeenCalledWith('[ERROR]:', 'error 1 2 3')
  })

  it('handles trace()', () => {
    const logger = new Logger(defaultOptions)
    const spy = jest.spyOn(console, 'trace')

    logger.trace('pity party 1 2 3')

    expect(spy).toHaveBeenCalledWith('[TRACE]:', 'pity party 1 2 3')
  })

  describe('handles being called with', () => {
    it('an object', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'info')

      logger.info({ message: 'logged event example' })

      expect(spy).toHaveBeenCalledWith('[INFO]:', {
        message: 'logged event example'
      })
    })

    it('an array of various prototypes', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'info')

      logger.info({
        message: 'logged event example',
        arr: [1, 2, 3, 4, 'foo', 'bar', false]
      })

      expect(spy).toHaveBeenCalledWith('[INFO]:', {
        message: 'logged event example',
        arr: [1, 2, 3, 4, 'foo', 'bar', false]
      })
    })

    it('an Error', () => {
      const logger = new Logger(defaultOptions)
      const spy = jest.spyOn(console, 'error')

      logger.error(new Error('logged event example'))

      expect(spy).toBeCalledWith('[ERROR]:', new Error('logged event example'))
    })
  })

  describe('handles custom options', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('timestamps: true', () => {
      const logger = new Logger({ ...defaultOptions, timestamps: true })
      const date = new Date().toJSON()
      const spy = jest.spyOn(console, 'info')

      logger.info('logged event example')

      expect(spy).toBeCalledWith('[INFO]:', 'logged event example', {
        timestamp: date
      })
    })

    it('id: true', () => {
      const logger = new Logger({ ...defaultOptions, id: true })
      const spy = jest.spyOn(console, 'info')

      logger.info('logged event example')

      expect(spy).toBeCalledWith(
        '[INFO]:',
        'logged event example',
        expect.objectContaining({ id: expect.stringMatching(uuidPattern) })
      )
    })
  })

  it('when there are no options passed', () => {
    const logger = new Logger({ colorize: false })
    const spy = jest.spyOn(console, 'info')

    logger.info('logged event example')

    expect(spy).toBeCalledWith(
      '[INFO]:',
      'logged event example',
      expect.objectContaining({ id: expect.stringMatching(uuidPattern) })
    )
  })
})
