import { model, Schema, Document } from 'mongoose'

export interface ICategory extends Document {
    name: string
    state: boolean
    color: string
    icon: string
    image: string
}

const categorySchema:Schema<ICategory> = new Schema({
    name: {
        type: String,
        unique: true,
        uppercase: true,
        required: [true, 'El Category es obligatorio'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
        uppercase: true,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
    },
})

categorySchema.methods.toJSON = function () {
    const { __v, _id, ...resto } = this.toObject()
    resto.id = _id

    return resto
}

export default model<ICategory>('Category', categorySchema)
