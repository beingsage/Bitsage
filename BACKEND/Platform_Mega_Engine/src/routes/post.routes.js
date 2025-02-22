"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_js_1 = require("../../../controllers/post.controller.js");
const auth_middleware_js_1 = require("../middlewares/auth.middleware.js");
const multer_middleware_js_1 = require("../middlewares/multer.middleware.js");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(post_controller_js_1.getAllBlogPosts)
    .post(auth_middleware_js_1.verifyJWT, multer_middleware_js_1.upload.fields([
    {
        name: "video",
        maxCount: 1,
    },
    {
        name: "thumbnail",
        maxCount: 1,
    },
]), post_controller_js_1.publishAPost);
exports.default = router;
