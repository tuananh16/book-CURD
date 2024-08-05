import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserService = async ({ email, name, password }) => {
  try {
    const isEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/g.test(email);
    if (isEmail) {
      const checkEmail = await User.find({ email });
      if (checkEmail.length) {
        return {
          status: 404,
          message: "email already exists",
        };
      } else {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          email,
          name,
          password: hash,
        });
        return {
          status: 200,
          data: {
            email: newUser.email,
            name: newUser.name,
          },
        };
      }
    } else {
      return {
        status: 404,
        message: "Invalid email ",
      };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "lỗi nặng" };
  }
};

const generalAccessToken = (data) => {
  const expiresIn = 1 * 60 * 1000;
  const access_token = jwt.sign({ data }, process.env.ACCESS_TOKEN, {
    expiresIn: "1",
  });
  const expiryTime = Date.now() + expiresIn;
  return { access_token, expiryTime };
};

const refreshlAccessToken = (data) => {
  const refresh_token = jwt.sign({ data }, process.env.REFRESH_TOKEN, {
    expiresIn: "360d",
  });
  return refresh_token;
};

export const loginUserService = async ({ email, password }) => {
  try {
    const checkUser = await User.find({ email });
    if (checkUser.length) {
      const checkPassword = bcrypt.compareSync(password, checkUser[0].password);
      if (checkPassword) {
        const access_token = generalAccessToken({
          name: checkUser[0].name,
          isAdmin: checkUser[0].isAdmin,
        });
        const refresh_token = refreshlAccessToken({
          name: checkUser[0].name,
          isAdmin: checkUser[0].isAdmin,
        });
        return {
          status: 200,
          data: {
            access_token: access_token.access_token,
            refresh_token,
            isAdmin: checkUser[0].isAdmin,
            access_token_expiry: access_token.expiryTime,
          },
        };
      } else {
        return { status: 401, message: "account or password is incorrect" };
      }
    } else {
      return { status: 401, message: "account or password is incorrect" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "error sv" };
  }
};

export const UserRefreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, function (err, user) {
        if (err) {
          resolve({
            status: "err",
            message: "token het han",
          });
        } else if (user) {
          const newAccessToken = generalAccessToken({
            isAdmin: user.data.isAdmin,
            id: user.data.id,
            name: user.data.name,
          });
          resolve({
            status: "OK",
            message: newAccessToken,
          });
        } else {
          resolve({
            status: "err",
            message: "you deo co quyen",
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllUserService = async () => {
  try {
    const allUser = await User.find();
    return { status: 200, data: allUser };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "error sv" };
  }
};
