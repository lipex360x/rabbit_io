import * as http from 'http'
import { Channel, connect } from "amqplib";
import { Server } from 'socket.io'

import CandleController from "src/controllers/CandleController";
import { CandleProps } from 'src/models/CandleModel';

export default class CandleMessageChannel {
  private _channel: Channel
  private _chandleCtrl: CandleController
  private _io: Server

  constructor(server: http.Server) {
    this._chandleCtrl = new CandleController()
    
    this._io = new Server(server, {
      cors: {
        origin: process.env.SOCKET_CLIENT_SERVER,
        methods: ["GET", "POST"]
      }
    })

    this._io.on('connection', ()=> console.log('Web Socket started'))

    this._createChannel()
  }

  private async _createChannel() {
    try {
      const connection = await connect(process.env.RABBITMQ_SERVER)
      this._channel = await connection.createChannel()
      this._channel.assertQueue(process.env.QUEUE_NAME)

    } catch (error) {
      console.log('Connection to RabbitMQ failed')
      console.log(error)
    }
  }

  consumeChannel() {
    this._channel.consume(process.env.QUEUE_NAME, async (msg) => {
      const candle:CandleProps = JSON.parse(msg.content.toString())

      this._channel.ack(msg)
      await this._chandleCtrl.save(candle)

      console.log(msg.content, candle)
      console.log('candle saved to database')

      this._io.emit(process.env.QUEUE_NAME, candle)
      console.log('New Candle emited by web socket')
    })

    console.log('Candle consumer started')
  }
}