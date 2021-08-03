const ScreamModel = require('../models/Scream');
const CommentModel = require('../models/Comment');
const LikeModel = require('../models/Like');
const NotificationModel = require('../models/Notification');

class NotificationController {
  create = (req, res) => {
    const postData = {
      recipient: req.body.recipient,
      sender: req.user._id,
      screamId: req.body.screamId,
      type: req.body.type,
      read: false
    };

    if(postData.recipient === postData.sender) return null;

    const notification = new NotificationModel(postData);

    notification.save()
      .then(() => {
        notification.populate(['recipient', 'sender']).execPopulate()
          .then(() => {
            res.json(notification);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
  }
}

module.exports = new NotificationController();