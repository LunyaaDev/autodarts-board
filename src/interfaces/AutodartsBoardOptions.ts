export interface AutodartsBoardOptions {
  /** Host of the Autodarts Boards */
  host: string
  /**
   * Port of the Autodarts Boards
   * @default 3180
   */
  port: number

  /**
   * Reconnect x seconds after last message or last connect
   * @default 30
   */
  reconnectAfter: number
}
