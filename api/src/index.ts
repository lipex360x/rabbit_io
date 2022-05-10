import { config } from 'dotenv'
import axios from 'axios'

config()

const readPrice = async (price = 0): Promise<number> => {
  const { data } = await axios.get(process.env.API_URL)
  price = data.bitcoin.usd
  return price
}

readPrice()