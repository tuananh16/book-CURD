import {
  createBookService,
  detailBookService,
  getAllBookService,
  deleteBookService,
  updateBookService,
} from "../services/bookService.js";

export const createBookController = async (req, res) => {
  try {
    const { title, author, body } = req.body;
    const response = await createBookService({ title, author, body });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the book",
      error: error.message,
    });
  }
};

export const getAllBookController = async (req, res) => {
  try {
    const user = req.data;
    const response = await getAllBookService({ user });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the book",
      error: error.message,
    });
  }
};

export const detailBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await detailBookService({ id });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the book",
      error: error.message,
    });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteBookService({ id });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while delete the book",
      error: error.message,
    });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, author } = req.body;
    const response = await updateBookService({ id, title, body, author });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while update the book",
      error: error.message,
    });
  }
};
