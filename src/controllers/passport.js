'use strict';
let LocalStrategy = require('passport-local').Strategy;
const userService = require('../service/user');
const {compare} = require('../common/hash');
const util = require('../common/util');

module.exports = function (passport) {
	passport.use('local-login', new LocalStrategy({
		// mặc định local strategy sử dụng username và password,
        // chúng ta cần cấu hình lại
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true // cho phép chúng ta gửi request lại hàm callback
	}, (req, email, password, done) => {
		// Hàm callback của nextTick chỉ được thực hiện khi hàm trên nó trong stack (LIFO) được thực hiện
		process.nextTick(async () => {
			try{
				let get_user = await userService.getUserByEmail(email); // tìm user đã tồn tại hay không
				let user = get_user[0];
				if (!user) {
					let data = util.sendError(200, "EMAIL__NOT_FOUND", 'email is not exist');
					return done(null, false, data); 
				}
				let hashPassword = user.password;
				let variable = await compare(password, hashPassword); // kiểm tra mật khẩu
				if (variable) {
					return done(null, user);
				} else {
					let data = util.sendError(400, "PASSWORD_INCORRECT", 'Your password is incorrect');
					return done(null, false, data);
				}
			}catch(e){
				console.log(e)
				let data = util.sendError(400, "PASSWORD_INCORRECT", 'Your password is incorrect');
				return done(null, false, data);
			}
		});
	}));
};