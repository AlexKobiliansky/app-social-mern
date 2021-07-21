const {model, Schema} = require('mongoose');

const LikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    scream: { type: Schema.Types.ObjectId, ref: "Scream" },
  },{
  timestamps: true,
}
);

module.exports = model('Like', LikeSchema);