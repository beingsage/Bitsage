import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath, options = {}) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const defaultOptions = {
      resource_type: "auto", // Automatically detect resource type
    };
    const uploadOptions = { ...defaultOptions, ...options };
    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions
    );
    if (response) fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
    return null;
  }
};


const deleteFromCloudinary = async (fileId) => {
  try {
    if (!fileId) return null;
    //delete the file on cloudinary
    const response = await cloudinary.uploader.destroy(fileId);
    if (response) fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
