const {model, Schema} = require('mongoose');

const ScreamSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    body: String,
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