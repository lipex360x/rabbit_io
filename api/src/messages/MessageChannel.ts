import { config } from 'dotenv'
import { Channel, connect } from 'amqplib'

config()

export default class MessageChannel {
  async execute(): Promise<Channel> {
    try {
      const connection = await connect(process.env.RABBITMQ_SERVER)
      const channel = await connection.createChannel()

      await channel.assertQueue(process.env.QUEUE_NAME)

      console.log('Connected to RabbitMQ')
      return channel
      
    } catch (error) {
      console.log('error while trying to connect to RabbitMQ')
      console.log(error)
      return null
    }
  }
}
