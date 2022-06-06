import { Schema, model , Document, Types } from "mongoose"

export interface ILocation extends Document {
	title: string;
	description: string;
	category: string;
	number: number;
	schedule: string;
	urlImage: String;
	urlLocation: String;
	image: string;

	user?: string;
}

const locationSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    required: [true, "name is required"],
    unique: true,
  },
  description: {
    type: String,
    lowercase: true,
    required: [true, "description is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  number: {
    type: Number,
    required: [true, "number is required"],
  },
  schedule: {
    type: String,
  },
  urlImage: String,
  urlLocation: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

locationSchema.methods.toJSON = function () {
  const { __v, ...resto } = this.toObject();

  return resto;
};

export default model<ILocation>("Location", locationSchema);
