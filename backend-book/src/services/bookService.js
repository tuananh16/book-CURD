import mongoose from "mongoose";
import { Book } from "../models/bookModel.js";
import e from "express";

export const createBookService = async ({ title, author, body }) => {
  try {
    if (!title || !author || !body) {
      return { status: 400, message: "All fields are required" };
    }
    const checkTitle = await Book.find({ title });
    if (checkTitle.length) {
      return { status: 400, message: "Book already exist" };
    } else {
      const newBook = await Book.create({ title, author, body });
      return { status: 200, data: newBook };
    }
  } catch (error) {
    console.error("Error in createBookService:", error);
    return { status: 500, message: "Failed to create book" };
  }
};

export const getAllBookService = async ({ user }) => {
  try {
    const getAllBook = await Book.find();
    return { status: 200, data: { user, getAllBook } };
  } catch (error) {
    console.error("Error in createBookService:", error);
    return { status: 500, message: "Failed to get all book" };
  }
};

export const detailBookService = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: 400,
        message: "Invalid user ID format",
      };
    }
    const checkId = await Book.findById(id);
    if (checkId) {
      return { status: 200, data: checkId };
    }
  } catch (error) {
    console.error("Error in createBookService:", error);
    return { status: 500, message: "Failed to get book" };
  }
};

export const deleteBookService = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: 400,
        message: "Invalid user ID format",
      };
    }
    const deleteBook = await Book.findByIdAndDelete(id);
    if (deleteBook) {
      return { status: 200, data: deleteBook };
    }
  } catch (error) {
    console.error("Error in createBookService:", error);
    return { status: 500, message: "Failed to delete book" };
  }
};

export const updateBookService = async ({ id, title, body, author }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: 400,
        message: "Invalid book ID format",
      };
    }
    if (!title || !author || !body) {
      return { status: 400, message: "All fields are required" };
    }

    const findBook = await Book.findById(id);
    if (!findBook) {
      return { status: 404, message: "Book not found" };
    }

    const checkTitle = await Book.findOne({ title });
    if (checkTitle && checkTitle._id.toString() !== id) {
      return { status: 400, message: "Book with this title already exists" };
    }

    const updateBook = await Book.findByIdAndUpdate(
      id,
      { title, body, author },
      { new: true }
    );

    if (!updateBook) {
      return { status: 500, message: "Failed to update book" };
    }

    return { status: 200, data: updateBook };

  } catch (error) {
    console.error("Error in updateBookService:", error);
    return { status: 500, message: "Internal server error" };
  }
};
