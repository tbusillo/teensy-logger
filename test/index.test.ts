import { describe, it, expect } from '@jest/globals'
import { add } from '../src/index'

describe('add', () => {
  it('should return 3', () => {
    expect(add()).toBe(3)
  })
})
