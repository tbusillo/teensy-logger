const trace = (...message: unknown[]) => console.trace(...message)
const info = (...message: unknown[]) => console.info(' INFO ', ...message)
const debug = (...message: unknown[]) => console.debug(' DEBUG ', ...message)
const warn = (...message: unknown[]) => console.warn(' WARN ', ...message)
const error = (...message: unknown[]) => console.error(' ERROR ', ...message)

// const log = console

export const logger = { trace, debug, info, warn, error }

export default logger
