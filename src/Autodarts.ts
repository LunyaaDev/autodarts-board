import { AutodartsWsMessage } from '@/interfaces/AutodartsWsRawMessage'
import { EventEmitter } from 'stream'
import { WebSocket } from 'ws'
import { websocketAddNormalizedValues } from './utils/websocketAddNormalizedValues'

export class AutodartsBoard {
  private host: string
  private port: number
  private ws: null | WebSocket = null

  // date of last connect or message from autodarts
  private wsLastInteraction: null | Date = null

  private eventEmitter = new EventEmitter()

  constructor(opts: { host: string; port?: number }) {
    this.host = opts.host
    this.port = opts.port || 3180

    this.connect()

    // reconnect if last message older that 30 sec
    setInterval(() => {
      const secondsSinceLastMessage = this.secondsSinceLastMessage()
      if (secondsSinceLastMessage && secondsSinceLastMessage > 30) {
        this.reconnect()
      }
    })
  }

  /**
   * Connect to Autodarts
   */
  private connect() {
    try {
      this.ws = new WebSocket(`ws://${this.host}:${this.port}/api/events`)
      // set last message to now to also reconnect if no message was send
      this.wsLastInteraction = new Date()

      this.ws.on('error', (e) => {})
      this.ws.on('message', (msg) => {
        this.wsLastInteraction = new Date()
        try {
          const json = JSON.parse(msg.toString())
          this.eventEmitter.emit('rawMessage', json)
          this.eventEmitter.emit('message', websocketAddNormalizedValues(json))
        } catch (error) {}
      })
    } catch (error) {}
  }

  /**
   * Reconnect
   */
  private reconnect() {
    if (this.ws) this.ws.close()
    this.ws = null
    this.connect()
  }

  /**
   * seconds since last message
   * @returns
   */
  private secondsSinceLastMessage() {
    if (!this.wsLastInteraction) return null
    return (new Date().getTime() - this.wsLastInteraction.getTime()) / 1000
  }

  /**
   * Register message handler
   * @param listener callback function for received message
   */
  onMessage(listener: (data: AutodartsWsMessage) => void) {
    this.eventEmitter.on('message', listener)
  }
}
