import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
export const tempDir = path.join(__dirname,"temp")
console.log(tempDir)

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

export const uploadToCloudinary = async (filePath) => {
  
  const ext = path.extname(filePath).toLowerCase();
 
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
  
  if (!allowed.includes(ext)) {
    throw new Error("Not an image file");
  }
 
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "uploads",
  });
  
  fs.unlinkSync(filePath); // Clean up temp file
  return result.secure_url;
};
