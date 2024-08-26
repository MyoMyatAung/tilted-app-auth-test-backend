const { omit } = require("lodash");
const { verifyJwt, signJwt } = require("../utils/jwt.utils");

exports.deserialize = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.headers["x-refresh-token"];

  // NO ACCESS TOKEN
  if (!accessToken) {
    return next();
  }

  // ACCESS TOKEN
  const { decoded, expired, valid } = verifyJwt(accessToken);

  // ACCESS TOKEN IS VALID
  if (!!decoded && valid) {
    res.locals.user = decoded;
    return next();
  }

  // ACCESS TOKEN IS EXPIRED
  if (expired) {
    // NO REFRESH TOKEN
    if (!refreshToken) {
      return next();
    }

    // REFRESH TOKEN
    const {
      decoded: rDecoded,
      expired: rExpired,
      valid: rValid,
    } = verifyJwt(refreshToken);

    // REFRESH TOKEN IS NOT VALID OR EXPIRED
    if (!rDecoded || rExpired || !rValid) {
      return next();
    }

    // REFRESH TOKEN IS VALID AND ASSIGN NEW TOKEN
    const newAccessToken = signJwt(
      omit(rDecoded, ["exp", "iat"]), // REMOVE exp and iat PROPERTY
      {
        expiresIn: process.env.ACCESS_TOKEN_TTL,
      }
    );

    // NEW HEADER WITH NEW ACCESS TOKEN
    res.setHeader("x-access-token", newAccessToken);
    res.locals.user = omit(rDecoded, ["exp", "iat"]);
    return next();
  }

  return next();
};