import { connection } from 'mongoose'

import { connectDB } from 'src/config/db'
import { app } from './app'

const createServer = async () => {
  const PORT = process.env.API_PORT
  await connectDB()

  const server = app.listen(PORT, () => {
    const processId = process.pid
    console.log(`🚀 Server started on port ${PORT} - PID: ${processId}`)
  })

  process.on('SIGTERM', async () => {
    await connection.close()
    server.close(() => process.exit())
    console.log('\n⚓ Server closed', new Date().toISOString())
  })

  process.on('SIGINT', async () => {
    console.log('\n⚓ API Stopped')
    await connection.close()
    server.close()
  })
}

createServer()
