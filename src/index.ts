import * as dotenv from 'dotenv'

dotenv.config()
// .env usage:

const { NODE_ENV } = process.env

console.log('Environment is currently: ', { NODE_ENV })

/**
 * @description This is a sample function that returns the sum of two numbers
 *
 * @returns {number} The sum of the variables `one` and `two`.
 */
export function add(): number {
  const one = 1
  const two = 2

  return one + two
}

console.log('Did this work?')
