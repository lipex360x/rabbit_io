import { connect } from 'mongoose'

export const connectDB = async () => {
  await connect(process.env.MONGO_URL)
  console.log('📚 MongoDB Connected')
}