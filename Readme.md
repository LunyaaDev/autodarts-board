# Autodarts Board

A easy-to-use library to interact locally with an [Autodarts](https://autodarts.io) Board.

## ✨ Features

- Connects to Autodarts boards over the local network
- Listens for real-time dart throw events
- ability to start and stop the cameras
- and more...

## 🚀 Example usage

```ts
import { AutodartsBoard } from 'autodarts-board'

const board = new AutodartsBoard({
  host: '192.168.0.69',
})

board.onMessage((msg) => {
  console.log(msg.data)
})
```

## ⚠️ Disclaimer

This library is in no way officially affiliated with or endorsed by Autodarts.
