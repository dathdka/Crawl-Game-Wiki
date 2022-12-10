require("dotenv");
const auth = (req, res, next) => {
  //TODO: remove token
  const { secretKey } = req.body;
  console.log(req.body)
  if (secretKey !== process.env.SECRET_KEY)
    res.status(403).send("invalid token");
  return next();
};
module.exports = auth;
