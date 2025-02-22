"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../../../controllers/user.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const router = (0, express_1.Router)();
// router.route('/').get((req, res) => {
//     res.send('User route');
// });
router.route("/register").post(user_controller_js_1.registerUser);
router.route("/login").post(user_controller_js_1.loginUser);
router.route("/logout").post(auth_middleware_js_1.verifyJWT, user_controller_js_1.logoutUser);
router.route("/refresh-token").post(user_controller_js_1.refreshAccessToken);
router.route("/read-user").get(user_controller_js_1.readuser);
router.route("/update-user").post(user_controller_js_1.updateUser);
router.route("/delete-user").delete(user_controller_js_1.deleteUser);
exports.default = router;
