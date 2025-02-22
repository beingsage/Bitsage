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
exports.verifyJWT = void 0;
const ApiError_js_1 = require("../utils/ApiError.js");
const asyncHandler_js_1 = require("../utils/asyncHandler.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_js_1 = __importDefault(require("../prismaconnect/prisma.js"));
exports.verifyJWT = (0, asyncHandler_js_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Check if the request is from a guest user
        if (req.query.guest === "true") {
            req.user = null; // Set req.user to null for guest users
            return next();
        }
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) ||
            ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        if (!token) {
            throw new ApiError_js_1.ApiError(401, "Unauthorized Request");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Use Prisma to find the user by ID
        const user = yield prisma_js_1.default.user.findUnique({
            where: { id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id },
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                avatar: true,
                coverImage: true,
                description: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new ApiError_js_1.ApiError(401, "Invalid Access Token");
        }
        req.user = user;
        next();
    }
    catch (error) {
        throw new ApiError_js_1.ApiError(401, (error === null || error === void 0 ? void 0 : error.message) || "Invalid Access Token");
    }
}));
