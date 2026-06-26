const express=require('express')

const authRouter=express.Router();
const {register, login,logout, adminRegister,deleteProfile} = require('../controllers/userAuthent');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');


authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',userMiddleware,logout);
authRouter.post('/admin/register',adminMiddleware,adminRegister);

authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);

authRouter.get('/check',userMiddleware,(req,res)=>{

    // const reply = {
    //     firstName: req.result.firstName,
    //     emailId: req.result.emailId,
    //     _id:req.result._id,
    //     role:req.result.role,
    // }
const reply = {
  firstName: req.result.firstName,
  lastName: req.result.lastName,
  emailId: req.result.emailId,
  _id: req.result._id,
  age: req.result.age,
  role: req.result.role,
  bio: req.result.bio,
  verified: req.result.verified,
  title: req.result.title,
  skills: req.result.skills,
  phone: req.result.phone,
  location: req.result.location,
  memberSince: req.result.memberSince,
  available: req.result.available,
  stats: {
    projects: req.result.stats?.projects,
    followers: req.result.stats?.followers,
    rating: req.result.stats?.rating,
  },
  activities: req.result.activities,

};

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})

 
module.exports = authRouter;