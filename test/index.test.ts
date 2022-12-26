import { describe, it, expect } from '@jest/globals'
import logger from '../src/index'

describe('logger', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('handles info()', () => {
    const spy = jest.spyOn(console, 'info')

    logger.info('testing 1 2 3')

    expect(spy).toHaveBeenCalledWith(' INFO ', 'testing 1 2 3')
  })

  it('handles debug()', () => {
    const spy = jest.spyOn(console, 'debug')

    logger.debug('testing 1 2 3')

    expect(spy).toHaveBeenCalledWith(' DEBUG ', 'testing 1 2 3')
  })

  it('handles warn()', () => {
    const spy = jest.spyOn(console, 'warn')

    logger.warn('warning 1 2 3')

    expect(spy).toHaveBeenCalledWith(' WARN ', 'warning 1 2 3')
  })

  it('handles error()', () => {
    const spy = jest.spyOn(console, 'error')

    logger.error('error 1 2 3')

    expect(spy).toHaveBeenCalledWith(' ERROR ', 'error 1 2 3')
  })

  it('handles trace()', () => {
    const spy = jest.spyOn(console, 'trace')

    logger.trace('pity party 1 2 3')

    expect(spy).toHaveBeenCalledWith('pity party 1 2 3')
  })

  describe('handles being called with', () => {
    it('an object', () => {
      const spy = jest.spyOn(console, 'info')

      logger.info({ message: 'logged event example' })

      expect(spy).toHaveBeenCalledWith(' INFO ', {
        message: 'logged event example'
      })
    })

    it('an array of various prototypes', () => {
      const spy = jest.spyOn(console, 'info')

      logger.info({
        message: 'logged event example',
        arr: [1, 2, 3, 4, 'foo', 'bar', false]
      })

      expect(spy).toHaveBeenCalledWith(' INFO ', {
        message: 'logged event example',
        arr: [1, 2, 3, 4, 'foo', 'bar', false]
      })
    })
  })
})
