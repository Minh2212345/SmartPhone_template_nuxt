import mitt from 'mitt'

// Create a single shared event bus instance
export const eventBus = mitt()

// Export convenience methods for cart events
export const emitCartUpdate = () => {
  eventBus.emit('cartUpdated')
}

export const onCartUpdate = (callback) => {
  eventBus.on('cartUpdated', callback)
}

export const offCartUpdate = (callback) => {
  eventBus.off('cartUpdated', callback)
}
