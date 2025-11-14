import 'dotenv/config'
import { AutodartsBoard } from 'autodarts-board'
;(async () => {
  const board = new AutodartsBoard({
    host: process.env.AUTODARTS_HOST!,
  })

  board.onMessage((msg) => {
    if (msg.type == 'motion_state') console.log(msg.data)
  })

  // board.start()
  // board.stop()
  // board.reset()
})()
