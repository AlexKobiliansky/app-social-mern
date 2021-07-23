const ScreamModel = require('../models/Scream');
const CommentModel = require('../models/Comment');
const LikeModel = require('../models/Like');

class ScreamController {

  index = (req, res) => {
    ScreamModel
      .find()
      .sort({createdAt: -1})
      .populate(['user'])
      .exec(function (err, screams) {
        if (err) {
          return res.status(404).json({
            status: 'error',
            message: err
          });
        }
        return res.json(screams);
      });
  }

  create = (req, res) => {
    const postData = {
      body: req.body.body,
      user: req.user._id,
    };

    const scream = new ScreamModel(postData);

    scream
      .save()
      .then(() => {
        res.json({scream});
      })
      .catch(err => {
        res.status(500).json({
          status: 'error',
          message: err
        });
      });
  }

  getScream = (req, res) => {
    const id = req.params.id;
    ScreamModel.findById(id, (err, scream) => {
      if (err) {
        return res.status(404).json({
          message: 'Not found scream'
        });
      }

      return res.json(scream);
    });
  }

  commentsOnScream = (req, res) => {
    const screamId = req.params.screamId;

    if (req.body.body.trim() === '') return res.status(400).json({
      status: 'error',
      message: 'Comment must not be empty'
    });

    ScreamModel.findById(screamId, (err, scream) => {
      if (err) {
        return res.status(404).json({
          status: 'error',
          message: 'Not found scream'
        });
      }

      const newComment = {
        body: req.body.body,
        user: req.user._id,
        userImage: req.user.imageURL,
        scream: screamId,
      }

      scream.commentsCount++;

      scream.save();

      const comment = new CommentModel(newComment);

      comment
        .save()
        .then(() => {
          res.json({
            status: 'success',
            message: `Scream ${scream._id} created successfully!`
          });
        })
        .catch(err => {
          res.status(500).json({
            status: 'error',
            message: err
          });
        });

      return res.json(comment);
    });
  }

  likeScream = (req, res) => {
    const screamId = req.params.screamId;
    const userId = req.user._id;

    ScreamModel.findById(screamId, (err, scream) => {
      if (err || !scream) {
        return res.status(404).json({
          message: 'Not found scream'
        });
      }

      LikeModel.find({scream: screamId, user: userId}).limit(1)
        .exec(function (err, likes) {
          if (likes.length) {
            return res.status(400).json({
              status: 'error',
              message: 'Scream liked already'
            });
          }

          if (err) {
            return res.status(500).json({
              status: 'error',
              message: err
            });
          }

          scream.likesCount++;

          scream.save((err) => {
            if (err) {
              return res.status(404).json({
                status: "error",
                message: err
              });
            }
          });

          const newLike = new LikeModel({
            user: userId,
            scream: screamId
          });

          newLike
            .save()
            .then(() => {
              return res.json({newLike});
            })
            .catch(err => {
              res.status(500).json({
                status: 'error',
                message: err
              });
            });
        });
    });
  }

  unlikeScream = (req, res) => {
    const screamId = req.params.screamId;
    const userId = req.user._id;

    ScreamModel.findById(screamId, (err, scream) => {
      if (err || !scream) {
        return res.status(404).json({
          message: 'Not found scream'
        });
      }

      LikeModel.find({scream: screamId, user: userId}).limit(1)
        .exec(function (err, likes) {

          const like = likes[0];

          if (err || !like) {
            return res.status(404).json({
              status: 'error',
              message: err
            });
          }

          scream.likesCount--;

          scream.save((err) => {
            if (err) {
              return res.status(404).json({
                status: "error",
                message: err
              });
            }
          });

          like.remove().then(() => {
            return res.json({
              status: 'success',
              message: 'like removed'
            });
          }).catch(err => {
            return res.json({
              status: 'success',
              message: err
            });
          });
        });
    });
  }

  deleteScream = (req, res) => {
    const screamId = req.params.id
    const userId = req.user._id

    ScreamModel.findById(screamId, (err, scream) => {
      if (err || !scream) {
        return res.status(404).json({
          status: 'error',
          message: err
        })
      }

      if (scream.user.toString() === userId) {

        scream.remove();

        return res.json({
          status: 'success',
          message: 'Scream deleted'
        })
      } else {
        return res.status(404).json({
          status: 'success',
          message: 'You cannot delete alien scream'
        });
      }
    });
  }
}

module.exports= new ScreamController();