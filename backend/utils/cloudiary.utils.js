import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
  cloud_name: 'ddrs3hpqf', 
  api_key: '171417557653171', 
  api_secret: 'jBW-MZReUNaliIItuFrc0tlL3E4'
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