const {model, Schema} = require('mongoose');

const ScreamSchema = new Schema({
    // userHandle: { type: Schema.Types.ObjectId, ref: "User" },
    userHandle: String,
    body: String,
  },{
  timestamps: true,
}
);

module.exports = model('Scream', ScreamSchema);