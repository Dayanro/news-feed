import { Schema, model } from "mongoose";

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String
  },
  quotations: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


export const NewsModel = model("News", NewsSchema);
