import { model, Schema } from "mongoose"
import { IData } from "."

const schema = new Schema<IData>({
    updateTime: { type: Date, required: true },
    data: { type: String, required: true },
    dataId: { type: Number, required: true }
}, {
    collection: 'data'
})

export default model<IData>('data', schema)
