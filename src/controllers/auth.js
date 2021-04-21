const userService = require("../service/user");
const util = require("../common/util");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const speakeasy = require('speakeasy');
const { hash } = require("../common/hash");
const QRCode = require('qrcode');

function checkAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    var decoded = jwt.verify(token, "hoang-quoc-khanh");
    if (decoded) {
      req.userId = decoded.userId;
      return next();
    }
    return res.status(401).send(util.error("Authorization", "Invalid token"));
  } catch (err) {
    return res.status(401).send(util.error("Authorization", "Invalid token"));
  }
}

async function sigin(req, res, next) {
  // passport.authenticate sẽ nhận vào callback cho method successs ở phần config passport
  passport.authenticate("local-login", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(500).send(info);
    } 
    if (user.is2FA) {
      return res.send(util.sendSuccess({ userId: user.id, isVerify2FA: true, isLoggedIn: false }));
    }
    let token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "hoang-quoc-khanh"
    );
    return res.send(
      util.sendSuccess({
        userId: user.id,
        email: user.email,
        isLoggedIn: true,
        token: token,
      })
    );
  })(req, res, next);
}

async function register(req, res, next) {
  try {
    const rows_email = await userService.checkEmail(req.body.email.trim());
    if (rows_email !== 0) {
      return res.send(
        util.sendError("EMAIL_ALREADY_EXISTS", "Email already exitsts!")
      );
    }
    // hàm hash từ common
    var user_password = await hash(req.body.password.toString().trim()); 
    let data = {
      email: req.body.email.trim(),
      password: user_password,
      is2FA: false,
      name: req.body.name.trim(),
    };
    const user = await userService.insertUser(data);
    res.send(util.sendSuccess({ user_id: user.id }));
  } catch (e) {
    return res
      .status(500)
      .send(util.sendError(500, util.errorCodes.INTERNAL_SERVER_ERROR));
  }
}

async function postEnable2FA(req, res) {
  try {
    const user = await userService.getUserVerify2FA(req.userId);
    const secret = speakeasy.generateSecret({
      issuer: 'App Kitin',
      name: 'App Kitin',
    });
    await userService.updateEnable2FA(user.id, secret.base32);
    const qrcode = await QRCode.toDataURL(secret.otpauth_url);
    return res.send(util.sendSuccess({ qrcode, secret: secret.base32 }));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(util.sendError(500, util.errorCodes.INTERNAL_SERVER_ERROR));
  }
}

async function postVerify2FA(req, res) {
  try {
    const { otpToken, userId } = req.body;
    const user = await userService.getUserVerify2FA(userId);
    const secret = user.secret_key;
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token: otpToken,
    });
    if (verified) {
      let token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        'chung-ta-cua-hien-tai',
        { expiresIn: '30m' },
      );
      let data = {
        userId: user.id,
        isLoggedIn: true,
        token,
      };
      return res.status(200).send(util.sendSuccess(data));
    }
    return res.status(401).send(util.error('Authorization', 'Invalid token'));
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(util.sendError(500, util.errorCodes.INTERNAL_SERVER_ERROR));
  }
}

module.exports = {
  checkAuthentication,
  sigin,
  register,
  postEnable2FA,
  postVerify2FA,
};
