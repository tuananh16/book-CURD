import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "token is valid",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.json({
        status: 401,
        message: "token het han",
      });
    }
    if (user.data) {
      req.data = user.data;
      next();
    } else {
      return res.json({
        status: 403,
        message: "you deo co quyen",
      });
    }
  });
};

export default authMiddleware;
