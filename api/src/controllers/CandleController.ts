import { CandleModel, CandleProps } from "src/models/CandleModel";

export default class CandleController {
  async save(candle: CandleProps): Promise<CandleProps> {
    return CandleModel.create(candle)
  }

  async findLastCandles(quantity: number): Promise<CandleProps[]> {
    const n = quantity > 0 ? quantity : 10
    return await CandleModel
                  .find()
                  .sort({ _id: -1 })
                  .limit(n)
  }
}