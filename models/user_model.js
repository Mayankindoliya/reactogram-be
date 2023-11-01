const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema (
  {
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile_img: {
      type: String,
      default:"https://media.istockphoto.com/id/1440715717/photo/a-full-moon-at-sunrise-setting-behind-the-mountain-range-of-himalayas-himachal-pradesh-india.webp?b=1&s=170667a&w=0&k=20&c=M7DloNR8BKpSwBioK54E5KYd1RRg6BDKTFwbeEoZWU0="
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

module.exports = mongoose.model('usersModel', UsersSchema);