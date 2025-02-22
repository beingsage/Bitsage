import { ApiError } from "../utils/ApiError.js"; // Custom error handling class
import { ApiResponse } from "../utils/ApiResponse.js"; // Custom API response class
import { asyncHandler } from "../utils/asyncHandler.js"; // Import asyncHandler
import prisma from "../prismaconnect/prisma.js"; 
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Get all blog posts sorted by title alphabetically and include only the owner's username
const getAllBlogPosts = asyncHandler(async (req, res) => {
  try {
    // Fetch all blog posts from the database using Prisma, sorted by title alphabetically
    const blogPosts = await prisma.blogPost.findMany({
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
      throw new ApiError(404, "No blog posts found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, blogPosts, "Blog posts fetched successfully"));
  } catch (error) {
    // Catch and throw any error with an appropriate message
    throw new ApiError(500, "Error fetching blog posts");
  }
});

const publishAPost = asyncHandler(async (req, res) => { 
  const { title, description, tags, isPublished, duration } = req.body;

  // Validate the title (mandatory field)
  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  // Validate if the user is authenticated
  const ownerId = req.user?.id; // Assumes `req.user` is populated after authentication
  if (!ownerId) {
    res.status(401);
    throw new Error("Unauthorized");
  }


let videoLocalPath;
if (
  req.files &&
  Array.isArray(req.files.video) &&
  req.files.video.length > 0
) {
  videoLocalPath = req.files.video[0].path;
}

let thumbnailLocalPath;
if (
  req.files &&
  Array.isArray(req.files.thumbnail) &&
  req.files.thumbnail.length > 0
) {
  thumbnailLocalPath = req.files.thumbnail[0].path;
}

  // Handle video and thumbnail files
    // const videoLocalPath = req.files?.video[0]?.path;

  // if (!videoLocalPath) throw new ApiError(401, "Video is required to publish");

  // const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  // if (!thumbnailLocalPath)
  //   throw new ApiError(401, "Thumbnail is required to publish");

  const [videoFile, thumbnailFile] = await Promise.all([
    uploadOnCloudinary(videoLocalPath),
    uploadOnCloudinary(thumbnailLocalPath),
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
    const tagPromises = tagArray.map((tagName) =>
      prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName },
      })
    );
    const createdTags = await Promise.all(tagPromises);
    tagIds = createdTags.map((tag) => tag.id);
  }

  // Create a new blog post
  const newBlogPost = await prisma.blogPost.create({
    data: {
      title,
      description: description,
      video: videoFile?.url || "",
      thumbnail: thumbnailFile?.url || "",
      isPublished: isPublished ?? true,
      duration: duration ?? null,
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
    .json(new ApiResponse(201,newBlogPost,"post published successfully"));
});

const getPostById = asyncHandler(async (req, res) => {});


const updatePost = asyncHandler(async (req, res) => {});


const deletePost = asyncHandler(async (req, res) => {});


export { getAllBlogPosts 
  , publishAPost
};
