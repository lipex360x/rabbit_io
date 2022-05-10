import 'dotenv/config'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candle'
import MessageChannel from './messages/MessageChannel'

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

const readPrice = async (price = 0): Promise<number> => {
  const { data } = await axios.get(process.env.API_URL)
  price = data.bitcoin.usd
  return price
}

const generateCandle = async () => {
  const messageChannel = new MessageChannel()
  const rabbitMQ = await messageChannel.execute()

  if(!rabbitMQ) return console.log('Fudeu')

  while(true) {
    const loopTimes = Period.ONE_MINUTE / Period.TEN_SECONDS
    const candle = new Candle('BTC')

    console.log('------------------------------')
    console.log('Generating new Candle')

    for(let i = 0; i < loopTimes; i++) {
      const price = await readPrice()

      candle.addValue(price)
      console.log(`Market price #${i + 1} of ${loopTimes}`)

      await sleep(Period.TEN_SECONDS)
    }

    candle.closeCandle()
    console.log('Candle closed')

    const candleObj = candle.toSimpleObject()
    console.log(candleObj)

    const candleJson = JSON.stringify(candleObj)
    rabbitMQ.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJson))
    console.log('Candle sent do queue')
  }
}

generateCandle()