const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user_model');

const PostSchema = new Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  likes: [   // for likes on post
    {
      type: Schema.Types.ObjectId,
      ref: "usersModel"   // Reference to the 'User' Model
    }
  ],
  comments: [  // for comments on post
    {
      commentText: String,
      commentedBy: {type: Schema.Types.ObjectId, ref: "usersModel"}
    }
  ],
  image: { type: String, required: true },
  user: {    //author:
    type: Schema.Types.ObjectId, // user _id here:
    ref: "usersModel" //Reference to the 'User' Model:    
  }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

module.exports = mongoose.model('post', PostSchema);