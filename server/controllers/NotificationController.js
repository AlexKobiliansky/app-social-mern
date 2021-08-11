const NotificationModel = require('../models/Notification');

class NotificationController {
  io;

  constructor(io) {
    this.io = io;
  }

  getNotifications = (req, res) => {
    const userId = req.user._id;

    NotificationModel
      .find({recipient: userId})
      .sort({createdAt: -1})
      .populate(['recipient', 'sender'])
      .exec(function (err, notifications) {
        if (err) {
          return res.status(404).json({
            status: 'error',
            message: err
          });
        }
        return res.json(notifications);
      });
  }

  create = (req, res) => {
    const postData = {
      recipient: req.body.recipient,
      sender: req.user._id,
      screamId: req.body.screamId,
      type: req.body.type,
      read: false
    };

    if (postData.recipient === postData.sender) return null;

    const notification = new NotificationModel(postData);

    notification.save()
      .then(() => {
        notification.populate(['recipient', 'sender']).execPopulate()
          .then(() => {
            res.json(notification);
            this.io.emit('NEW_NOTIFICATION', notification)
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
  }

  markAsRead = (req, res) => {
    const ids = req.body.ids;

    NotificationModel.find()
      .where('_id')
      .in(ids)
      .updateMany({}, {$set: {read: true}})
      .exec((err, notifications) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          status: 'success',
          message: 'updated'
        });
      });
  }

  markAsUnread = (req, res) => {
    const ids = req.body.ids;

    NotificationModel.find()
      .where('_id')
      .in(ids)
      .updateMany({}, {$set: {read: false}})
      .exec((err, notifications) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          status: 'success',
          message: 'updated'
        });
      });
  }
}

module.exports = NotificationController;