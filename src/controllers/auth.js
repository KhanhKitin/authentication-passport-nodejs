const userService = require("../service/user");
const util = require("../common/util");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { hash } = require("../common/hash");

function checkAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    var decoded = jwt.verify(token, "hoang-quoc-khanh");
    if (decoded) {
      req.user_id = decoded.user_id;
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
    } else {
      // Sử dụng JWT để sinh ra token chứa info của user đã login
      var token = jwt.sign(
        {
          user_id: user.id,
          email: user.email,
        },
        "hoang-quoc-khanh"
      );
    }
    return res.send(
      util.sendSuccess({
        user_id: user.id,
        email: user.email,
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

module.exports = {
  checkAuthentication,
  sigin,
  register,
};
