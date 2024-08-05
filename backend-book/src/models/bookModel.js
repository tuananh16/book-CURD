import mongoose from "mongoose";
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    author: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model("Book", bookSchema);

