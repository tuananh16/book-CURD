import jwt from "jsonwebtoken";
import {
  getAllUserService,
  loginUserService,
  registerUserService,
  UserRefreshTokenService,
} from "../services/userService.js";

export const registerUserController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.json({
        status: 404,
        message: "All fields are required",
      });
    }
    const response = await registerUserService({ email, name, password });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while update the book",
      error: error.message,
    });
  }
};

export const getAllUserController = async (req, res) => {
  try {
    const response = await getAllUserService();
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while update the book",
      error: error.message,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: 404,
        message: "All fields are required",
      });
    }
    const response = await loginUserService({ email, password });
    return res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while update the book",
      error: error.message,
    });
  }
};

export const userRefreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.headers.token.split(" ")[1];
    if (refreshToken) {
      const response = await UserRefreshTokenService(refreshToken);
      return res.status(201).json(response);
    } else {
      return res.status(400).message("the refreshtoken is not valid");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error",
      error: error.message,
    });
  }
};

export const user = async (req, res) => {
  try {
    const user = req.data;
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while update the book",
      error: error.message,
    });
  }
};
