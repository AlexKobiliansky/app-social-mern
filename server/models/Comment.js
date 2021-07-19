const {model, Schema} = require('mongoose');

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    scream: { type: Schema.Types.ObjectId, ref: "Scream" },
    body: String,
  },{
  timestamps: true,
}
);

module.exports = model('Comment', CommentSchema);