const {model, Schema} = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required!',
  },
    email: {
      type: String,
      required: 'Email address is required!',
      validate: [isEmail, 'Enter correct email!'],
      unique: true
    },
    password: {
      type: String,
      required: 'Password address is required!',
    },
    imageUrl: {
      type: String,
    },
  bio: String,
  website: String,
  location: String
  }, {
    timestamps: true,
  }
);

module.exports = model('User', UserSchema);