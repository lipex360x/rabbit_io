import { model, Document, Schema } from 'mongoose'

export type CandleProps = {
  low: number
  high: number
  open: number
  close: number
  color: string

  finaldateTime: Date
  currency: string
} & Document

const schema = new Schema<CandleProps>({
  low: { type: Number, required: true },
  high: { type: Number, required: true },
  open: { type: Number, required: true },
  close: { type: Number, required: true },
  color: { type: String, required: true },

  finaldateTime: { type: Date, required: true },
  currency: { type: String, required: true },
})

export const CandleModel = model<CandleProps>('Candle', schema)