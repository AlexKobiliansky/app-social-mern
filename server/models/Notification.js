const {model, Schema} = require('mongoose');

const NotificationSchema = new Schema({
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: 'no recipient'
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: 'no sender'
    },
    screamId: {
      type: Schema.Types.ObjectId,
      ref: "Scream",
      required: 'no screamId'
    },
    type: String,
    read: {
      type: Boolean,
      default: false
    },
  }, {
    timestamps: true,
  }
);

module.exports = model('Notification', NotificationSchema);