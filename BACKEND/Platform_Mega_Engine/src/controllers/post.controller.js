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
exports.publishAPost = exports.getAllBlogPosts = void 0;
const ApiError_js_1 = require("../utils/ApiError.js"); // Custom error handling class
const ApiResponse_js_1 = require("../utils/ApiResponse.js"); // Custom API response class
const asyncHandler_js_1 = require("../utils/asyncHandler.js"); // Import asyncHandler
const prisma_js_1 = __importDefault(require("../prismaconnect/prisma.js"));
const cloudinary_js_1 = require("../utils/cloudinary.js");
// Get all blog posts sorted by title alphabetically and include only the owner's username
const getAllBlogPosts = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all blog posts from the database using Prisma, sorted by title alphabetically
        const blogPosts = yield prisma_js_1.default.blogPost.findMany({
            include: {
                owner: {
                    select: {
                        username: true, // Only include the 'username' field of the owner
                    },
                },
                blogPostTags: {
                    include: {
                        tag: true, // Optionally include the tags associated with each blog post
                    },
                },
            },
            orderBy: {
                title: "asc", // Sort by title field in ascending order (alphabetically)
            },
        });
        if (!blogPosts || blogPosts.length === 0) {
            throw new ApiError_js_1.ApiError(404, "No blog posts found");
        }
        return res
            .status(200)
            .json(new ApiResponse_js_1.ApiResponse(200, blogPosts, "Blog posts fetched successfully"));
    }
    catch (error) {
        // Catch and throw any error with an appropriate message
        throw new ApiError_js_1.ApiError(500, "Error fetching blog posts");
    }
}));
exports.getAllBlogPosts = getAllBlogPosts;
const publishAPost = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, tags, isPublished, duration } = req.body;
    // Validate the title (mandatory field)
    if (!title) {
        res.status(400);
        throw new Error("Title is required");
    }
    // Validate if the user is authenticated
    const ownerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assumes `req.user` is populated after authentication
    if (!ownerId) {
        res.status(401);
        throw new Error("Unauthorized");
    }
    let videoLocalPath;
    if (req.files &&
        Array.isArray(req.files.video) &&
        req.files.video.length > 0) {
        videoLocalPath = req.files.video[0].path;
    }
    let thumbnailLocalPath;
    if (req.files &&
        Array.isArray(req.files.thumbnail) &&
        req.files.thumbnail.length > 0) {
        thumbnailLocalPath = req.files.thumbnail[0].path;
    }
    // Handle video and thumbnail files
    // const videoLocalPath = req.files?.video[0]?.path;
    // if (!videoLocalPath) throw new ApiError(401, "Video is required to publish");
    // const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    // if (!thumbnailLocalPath)
    //   throw new ApiError(401, "Thumbnail is required to publish");
    const [videoFile, thumbnailFile] = yield Promise.all([
        (0, cloudinary_js_1.uploadOnCloudinary)(videoLocalPath),
        (0, cloudinary_js_1.uploadOnCloudinary)(thumbnailLocalPath),
    ]);
    //if (!videoFile || !thumbnailFile) {
    //   let errorMessage = "";
    //   if (!videoFile) errorMessage += "Failed to upload video. ";
    //   if (!thumbnailFile) errorMessage += "Failed to upload thumbnail.";
    //   throw new ApiError(500, errorMessage);
    // }
    // Process tags
    let tagIds = [];
    if (tags && tags.length > 0) {
        const tagArray = Array.isArray(tags) ? tags : JSON.parse(tags); // Parse tags if sent as a JSON string
        const tagPromises = tagArray.map((tagName) => prisma_js_1.default.tag.upsert({
            where: { name: tagName },
            update: {},
            create: { name: tagName },
        }));
        const createdTags = yield Promise.all(tagPromises);
        tagIds = createdTags.map((tag) => tag.id);
    }
    // Create a new blog post
    const newBlogPost = yield prisma_js_1.default.blogPost.create({
        data: {
            title,
            description: description,
            video: (videoFile === null || videoFile === void 0 ? void 0 : videoFile.url) || "",
            thumbnail: (thumbnailFile === null || thumbnailFile === void 0 ? void 0 : thumbnailFile.url) || "",
            isPublished: isPublished !== null && isPublished !== void 0 ? isPublished : true,
            duration: duration !== null && duration !== void 0 ? duration : null,
            ownerId,
            blogPostTags: {
                create: tagIds.map((tagId) => ({ tagId })),
            },
        },
        include: {
            blogPostTags: { include: { tag: true } }, // Include tags in the response
        },
    });
    return res
        .status(200)
        .json(new ApiResponse_js_1.ApiResponse(201, newBlogPost, "post published successfully"));
}));
exports.publishAPost = publishAPost;
const getPostById = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const updatePost = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
const deletePost = (0, asyncHandler_js_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
