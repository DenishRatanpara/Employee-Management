import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadToCloudinary = async ( localFilePath ) => {
    try {
        if(!localFilePath) return;
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("file uploded successfully", responce.url);
        fs.unlinkSync(localFilePath)
        return responce
    } catch (error) {
        console.error("error while uploading on cloudinary", error);
        fs.unlinkSync(localFilePath)
    }
}

export { uploadToCloudinary }