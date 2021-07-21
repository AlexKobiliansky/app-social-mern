const {model, Schema} = require('mongoose');

const ScreamSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    body: String,
    userImage: {
      type: String,
      default: 'https://msk.pohudejkina.ru/wp-content/plugins/userswp/assets/images/no_profile.png'
    },
    likesCount: {
      type: Number,
      default: 0
    },
  commentsCount: {
    type: Number,
    default: 0
  }
  }, {
    timestamps: true,
  }
);

module.exports = model('Scream', ScreamSchema);