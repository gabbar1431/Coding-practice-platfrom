// const cloudinary =require('cloudinary').v2;
// const Problem=require('../models/problem');
// const SolutionVideo = require('../models/solutionVideo');


// cloudinary.config({
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//     api_key:process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });


// const generateUploadSignature = async(req, res)=>{
//     try{
//       const {problemId} = req.params;

//       const userId = req.result._id;
       
//       // Verify problem exist

//       const problem = await Problem.findById(problemId);
//       if(!problem){
//         return res.status(404).json({error: 'Problem not found'});

//       }

//       // Generate unique public_id for the video

//       const timestamps = Math.round(new Date().getTime()/1000);
//       const publicId=`leetcode-solutions/${problemId}/${userId}_${timestamps}`;


//       // upload parameters

//       const uploadParams ={
//         timestamp:timestamps,
//         public_id:publicId,
//       };

//       const signature = cloudinary.utils.api_sign_request(
//        uploadParams,
//        process.env.CLOUDINARY_API_SECRET
//       );
//             console.log("hello gabbar")

//      res.json({
//        signature,
//        timestamps,
//        public_id:publicId,
//        api_key:process.env.CLOUDINARY_API_KEY,
//        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
//       //  upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
//        upload_url : `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
  

//      });
//     }
//     catch(error){
//       console.log("error occcccccur")
//      console.error('Error generating upload signature:',error);
//      res.status(500).json({error:'Failed to generate upload credenatials'});
//     }
// };


// const saveVideoMetadata =async(req,res)=>{
//   console.log("pihuuuuu")
//      try{
//         const{
//      problemId,
//      cloudinaryPublicId,
//      secureUrl,
//      duration,
//      } = req.body;
//    // Verify the upload with cloudinary
//     const userId = req.result._id;


//    const cloudinaryResource = await cloudinary.api.resource(
//     cloudinaryPublicId,
//     {resource_type:'video'}
//    );

//    if(!cloudinaryResource){
//     return res.status(400).json({error:'Video not found on cloudinary'});
    
//    }


//    // check if video already exists for this problem and user
//    const existingVideo = await SolutionVideo.findOne({
//     problemId,
//     userId,
//     cloudinaryPublicId
//    });

//      if (existingVideo) {
//       return res.status(409).json({ error: 'Video already exists' });
//     }
 
//     const thumbnailUrl =cloudinary.image(cloudinaryResource.public_id,{resource_type:"video"})


//       const videoSolution = await SolutionVideo.create({
//       problemId,
//       userId,
//       cloudinaryPublicId,
//       secureUrl,
//       duration: cloudinaryResource.duration || duration,
//       thumbnailUrl
//     });
//             console.log("hellllo shyammmmm")


//     res.status(201).json({
//       message: 'Video solution saved successfully',
//       videoSolution: {
//         id: videoSolution._id,
//         thumbnailUrl: videoSolution.thumbnailUrl,
//         duration: videoSolution.duration,
//         uploadedAt: videoSolution.createdAt
//       }
//     });
//     }

//      catch(error){
//             console.log("hellllo shyam")

//     console.error('Error saving video metadata ', error);
//     res.status(500).json({error:'Failed to save video metaData' });
//      }
// };

// const deleteVideo = async(req, res)=>{
//     try{
//     const {problemId} = req.params;

//     const userId = req.result._id;
    

//     const video = await SolutionVideo.findOneAndDelete({problemId:problemId});
//     if(!video){
//         return res.status(404).json({error:'Video not found'});

//     }

//     await cloudinary.uploader.destroy(video.cloudinaryPublicId,{resource_type:'video',invalidate:true});
//     res.json({message:'Video deleted Succesfully'});
//     }
//     catch(error){
//         console.error('Error Video deleting ',error);
//         res.status(500).json({error:'Failed to delete video'})
//     }
// }
// module.exports = {generateUploadSignature,saveVideoMetadata,deleteVideo};
const cloudinary = require("cloudinary").v2;
const Problem = require("../models/problem");
const SolutionVideo = require("../models/solutionVideo");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Generate signature for client upload
const generateUploadSignature = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    // Verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Generate unique public_id
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `leetcode-solutions/${problemId}/${userId}_${timestamp}`;

    const uploadParams = {
      timestamp,
      public_id: publicId,
    };

    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      signature,
      timestamp, // ✅ fixed
      public_id: publicId,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
    });
  } catch (error) {
    console.error("Error generating upload signature:", error);
    res.status(500).json({ error: "Failed to generate upload credentials" });
  }
};

// Save metadata after upload
const saveVideoMetadata = async (req, res) => {
  try {
    const { problemId, cloudinaryPublicId, secureUrl, duration } = req.body;
    const userId = req.result._id;

    // Verify video exists in Cloudinary
    const cloudinaryResource = await cloudinary.api.resource(cloudinaryPublicId, {
      resource_type: "video",
    });

    if (!cloudinaryResource) {
      return res.status(400).json({ error: "Video not found on cloudinary" });
    }

    // Check if already exists
    const existingVideo = await SolutionVideo.findOne({
      problemId,
      userId,
      cloudinaryPublicId,
    });

    if (existingVideo) {
      return res.status(409).json({ error: "Video already exists" });
    }

    // Generate thumbnail URL
    const thumbnailUrl = cloudinary.url(cloudinaryResource.public_id, {
      resource_type: "video",
      format: "jpg",
      transformation: [
        { width: 300, height: 200, crop: "thumb", gravity: "auto" },
      ],
    });

    const videoSolution = await SolutionVideo.create({
      problemId,
      userId,
      cloudinaryPublicId,
      secureUrl,
      duration: cloudinaryResource.duration || duration,
      thumbnailUrl,
    });

    res.status(201).json({
      message: "Video solution saved successfully",
      videoSolution: {
        id: videoSolution._id,
        thumbnailUrl: videoSolution.thumbnailUrl,
        duration: videoSolution.duration,
        uploadedAt: videoSolution.createdAt,
      },
    });
  } catch (error) {
    console.error("Error saving video metadata ", error);
    res.status(500).json({ error: "Failed to save video metadata" });
  }
};

// Delete video
const deleteVideo = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.result._id;

    const video = await SolutionVideo.findOneAndDelete({ problemId, userId });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    await cloudinary.uploader.destroy(video.cloudinaryPublicId, {
      resource_type: "video",
      invalidate: true,
    });

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video ", error);
    res.status(500).json({ error: "Failed to delete video" });
  }
};

module.exports = { generateUploadSignature, saveVideoMetadata, deleteVideo };
