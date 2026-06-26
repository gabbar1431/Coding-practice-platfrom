const mongoose = require('mongoose');
const {Schema} = mongoose;

// const userSchema = new Schema({
//     firstName:{
//         type: String,
//         required: true,
//         minLength:3,
//         maxLength:20
//     },
//     lastName:{
//         type:String,
//         minLength:3,
//         maxLength:20,
//     },
//     emailId:{
//         type:String,
//         required:true,
//         unique:true,
//         trim: true,
//         lowercase:true,
//         immutable: true,
//     },
//     age:{
//         type:Number,
//         min:6,
//         max:80,
//     },
//     role:{
//         type:String,
//         enum:['user','admin'],
//         default: 'user'
//     },
//     problemSolved:{
//         type:[{
//             type:Schema.Types.ObjectId,
//             ref:'problem',
//             unique:true
//         }],
//     },
//     password:{
//         type:String,
//         required: true
//     }
// },{
//     timestamps:true
// });


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    immutable: true,
  },
  age: {
    type: Number,
    min: 6,
    max: 80,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: true
  },

  // New fields below
  bio: {
    type: String,
    maxLength: 500
  },
  verified: {
    type: Boolean,
    default: false
  },
  title: {
    type: String, // e.g. "Senior Frontend Developer"
    maxLength: 50
  },
  skills: {
    type: [String]
  },
  phone: {
    type: String,
    maxLength: 25
  },
  location: {
    type: String,
    maxLength: 100
  },
  memberSince: {
    type: String,
    maxLength: 30 // Or consider using Date for more precision
  },
  available: {
    type: Boolean,
    default: false
  },
  stats: {
    projects: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 }
  },
  activities: {
    type: [String] // Stores recent activities as strings
  },
  problemSolved: [{
    type: Schema.Types.ObjectId,
    ref: 'problem',
    unique: true
  }]
}, { timestamps: true });

userSchema.post('findOneAndDelete', async function (userInfo) {
    if (userInfo) {
      await mongoose.model('submission').deleteMany({ userId: userInfo._id });
    }
});


const User = mongoose.model("user",userSchema);

module.exports = User;
