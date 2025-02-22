"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.refreshAccessToken = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const generateToken_js_1 = require("../utils/generateToken.js");
const prisma_js_1 = __importDefault(require("../prismaconnect/prisma.js"));
const ApiError_js_1 = require("../utils/ApiError.js"); // Assuming you have ApiError to handle errors
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const ApiResponse_js_1 = require("../utils/ApiResponse.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var status;
(function (status) {
    status["SUCCESS"] = "success";
    status["ERROR"] = "error";
    status["PENDING"] = "pending";
})(status || (status = {}));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
const generateAccessAndRefreshTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user from the database
        const user = yield prisma_js_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new ApiError_js_1.ApiError(404, "User not found");
        }
        // Generate the access and refresh tokens
        const accessToken = (0, generateToken_js_1.generateAccessToken)(user);
        const refreshToken = (0, generateToken_js_1.generateRefreshToken)(user);
        // Update the user's refreshToken in the database
        yield prisma_js_1.default.user.update({
            where: { id: userId },
            data: { refreshToken },
        });
        // Return the tokens
        return { accessToken, refreshToken };
    }
    catch (error) {
        throw new ApiError_js_1.ApiError(500, "Something went wrong while generating refresh and access token");
    }
});
const registerUser = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, username, password } = req.body;
    // Validate that all fields are provided
    if ([fullName, email, username, password].some((field) => field === undefined || (field === null || field === void 0 ? void 0 : field.trim()) === "")) {
        throw new ApiError_js_1.ApiError(400, "All fields are required");
    }
    // Check if the email or username already exists in the database
    const existingUser = yield prisma_js_1.default.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
    });
    if (existingUser)
        throw new ApiError_js_1.ApiError(409, "Email or Username already exists");
    const hashedPassword = yield hashPassword(password);
    // Handle avatar and cover image uploads
    //   const avatarLocalPath = req.files?.avatar[0]?.path;
    //   let coverImageLocalPath;
    //   if (
    //     req.files &&
    //     Array.isArray(req.files.coverImage) &&
    //     req.files.coverImage.length > 0
    //   ) {
    //     coverImageLocalPath = req.files.coverImage[0].path;
    //   }
    //   if (!avatarLocalPath)
    //     throw new ApiError(400, "Avatar is required");
    //   // Upload images to Cloudinary
    //   const avatar = await uploadOnCloudinary(avatarLocalPath, {
    //     /* your options */
    //   });
    //   const coverImage = coverImageLocalPath
    //     ? await uploadOnCloudinary(coverImageLocalPath, {
    //         /* your options */
    //       })
    //     : null;
    //   if (!avatar) throw new ApiError(400, "Avatar uploading failed");
    // Create the new user in the database
    const user = yield prisma_js_1.default.user.create({
        data: {
            fullName,
            email,
            username: username.toLowerCase(),
            password: hashedPassword // You should hash the password before saving it
            // avatar: avatar
            // ?{
            //   create: {
            //     fileId: avatar.public_id,
            //     url: avatar.secure_url,
            //   },
            // }:undefined,
            // coverImage: coverImage
            //   ? {
            //       create: {
            //         fileId: coverImage.public_id,
            //         url: coverImage.secure_url,
            //       },
            //     }
            //   : undefined,
        },
    });
    // Fetch the created user without password and refreshToken
    const createdUser = yield prisma_js_1.default.user.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            avatar: true,
            coverImage: true,
            refreshToken: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!createdUser)
        throw new ApiError_js_1.ApiError(500, "Account creation failed");
    // Send response
    return res
        .status(201)
        .json(new ApiResponse_js_1.ApiResponse(200, createdUser, "User registered Successfully"));
}));
exports.registerUser = registerUser;
const verifyPassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    // Compare provided password with the hashed password in the database
    return yield bcrypt_1.default.compare(password, hashedPassword);
});
const loginUser = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail) {
        throw new ApiError_js_1.ApiError(400, "Username or email is required");
    }
    const user = yield prisma_js_1.default.user.findFirst({
        where: {
            OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        },
    });
    if (!user) {
        throw new ApiError_js_1.ApiError(404, "User does not exist");
    }
    // Check if the password is correct
    const isPasswordValid = yield verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError_js_1.ApiError(401, "Invalid user credentials");
    }
    // Generate tokens
    const { accessToken, refreshToken } = yield generateAccessAndRefreshTokens(user.id);
    // Fetch user details without password or refreshToken
    const loggedInUser = yield prisma_js_1.default.user.findUnique({
        where: { id: user.id },
        select: {
            id: true,
            fullName: true,
            email: true,
            username: true,
            avatar: true,
            coverImage: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    // Set cookies with the tokens
    res.setHeader("Set-Cookie", [
        `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
        `refreshToken=${refreshToken}; Max-Age=${15 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
    ]);
    // Send success response
    return res.status(200).json(new ApiResponse_js_1.ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
    }, "User logged in successfully"));
}));
exports.loginUser = loginUser;
const logoutUser = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract userId from req.user which is added by the middleware
    const userId = req.user.id;
    // Remove the refreshToken field from the User record
    yield prisma_js_1.default.user.update({
        where: { id: userId },
        data: {
            refreshToken: null, // Unset the refreshToken
        },
    });
    // Clear cookies
    res.setHeader("Set-Cookie", [
        "accessToken=; Max-Age=-1; Path=/; HttpOnly; Secure; SameSite=None",
        "refreshToken=; Max-Age=-1; Path=/; HttpOnly; Secure; SameSite=None",
    ]);
    return res
        .status(200)
        .json(new ApiResponse_js_1.ApiResponse(200, {}, "User logged out successfully"));
}));
exports.logoutUser = logoutUser;
const refreshAccessToken = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken)
        throw new ApiError_js_1.ApiError(401, "Unauthorized Request");
    try {
        // Verify the refresh token using JWT
        const decodedToken = jsonwebtoken_1.default.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = yield prisma_js_1.default.user.findUnique({
            where: { id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id },
        });
        if (!user)
            throw new ApiError_js_1.ApiError(401, "Invalid refresh Token");
        if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError_js_1.ApiError(401, "Refresh token is Expired or used");
        }
        // Generate new access and refresh tokens
        const { accessToken, newRefreshToken } = yield generateAccessAndRefreshTokens(user.id);
        // Update the refresh token in the database
        yield prisma_js_1.default.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
        });
        // Set cookies with the new tokens
        res.setHeader("Set-Cookie", [
            `accessToken=${accessToken}; Max-Age=${1 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
            `refreshToken=${newRefreshToken}; Max-Age=${15 * 24 * 60 * 60}; Path=/; HttpOnly; Secure; SameSite=None`,
        ]);
        return res
            .status(200)
            .json(new ApiResponse_js_1.ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed successfully"));
    }
    catch (error) {
        throw new ApiError_js_1.ApiError(401, (error === null || error === void 0 ? void 0 : error.message) || "Invalid refresh token");
    }
}));
exports.refreshAccessToken = refreshAccessToken;
const getCurrentUser = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id; // The user ID is already extracted by middleware
    const user = yield prisma_js_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new ApiError_js_1.ApiError(404, "User not found");
    }
    return res
        .status(200)
        .json(new ApiResponse_js_1.ApiResponse(200, { user }, "Current User fetched successfully"));
}));
exports.getCurrentUser = getCurrentUser;
