const ScreamModel = require('../models/Scream');
const CommentModel = require('../models/Comment');
const LikeModel = require('../models/Like');

class ScreamController {

  io;

  constructor(io) {
    this.io = io;
  }

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

    if (postData.body.length < 1) {
      return res.status(500).json({
        status: 'error',
        msg: 'Empty scream',
        param: 'screamError'
      });
    }

    const scream = new ScreamModel(postData);

    scream.save()
      .then(() => {
        scream.populate('user').execPopulate()
          .then(() => {
            res.json(scream);
            this.io.emit('NEW_SCREAM', scream);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      })
  }

  getScream = (req, res) => {
    const id = req.params.id;
    ScreamModel.findById(id)
      .populate('user')
      .exec(function (err, scream) {
        if (err) {
          return res.status(404).json({
            message: 'Not found scream'
          });
        }

        CommentModel.find({scream: id})
          .populate('user')
          .exec((err, comments) => {
            if (err) {
              return res.status(404).json([{
                status: 'error',
                msg: 'Error during executing scream comments',
                param: 'commentError'
              }]);
            }

            return res.json({
              scream: scream,
              comments: comments
            });
          });
      });
  }

  commentsOnScream = (req, res) => {
    const screamId = req.params.screamId;

    if (req.body.body.trim() === '') return res.status(400).json({
      status: 'error',
      msg: 'Comment must not be empty'
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
        scream: screamId,
      }

      scream.commentsCount++;

      scream.save();

      const comment = new CommentModel(newComment);

      comment
        .save()
        .then(() => {
          comment.populate('user').execPopulate()
            .then(() => {
              const result = {
                scream: scream,
                comment: comment
              }
              this.io.emit('NEW_COMMENT_ON_SCREAM', result);
              res.json(result);
            })
        })
        .catch(err => {
          res.status(500).json({
            status: 'error',
            msg: err
          });
        });
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

      LikeModel
        .find({scream: screamId, user: userId}).limit(1)
        .lean()
        .exec( (err, likes) => {
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
            .save( (err, newLike) => {

              if (err) {
                return res.status(500).json({
                  status: 'error',
                  message: err
                });
              }

              scream
                .populate('user').execPopulate().then(() => {

                CommentModel.find({scream: screamId})
                  .populate('user')
                  .exec((err, comments) => {
                    if (err) {
                      return res.status(404).json([{
                        status: 'error',
                        msg: 'Error during executing scream comments',
                        param: 'commentError'
                      }]);
                    }

                    this.io.emit('UPDATE_LIKES_ON_SCREAM', scream.populate(['user']));

                    return res.json({
                      scream: scream,
                      comments: comments
                    });
                  });


                // res.json(scream.populate(['user']));
              })
                .catch(err => {
                  res.status(500).json({
                    status: 'error',
                    message: err
                  });
                })
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
        .exec((err, likes) => {

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


          like.remove((err, newLike) => {
            scream.populate('user').execPopulate().then(() => {

              CommentModel.find({scream: screamId})
                .populate('user')
                .exec((err, comments) => {
                  if (err) {
                    return res.status(404).json([{
                      status: 'error',
                      msg: 'Error during executing scream comments',
                      param: 'commentError'
                    }]);
                  }

                  this.io.emit('UPDATE_LIKES_ON_SCREAM', scream.populate(['user']));

                  return res.json({
                    scream: scream,
                    comments: comments
                  });
                });
            })
              .catch(err => {
                return res.json({
                  status: 'success',
                  message: err
                });
              });
          });
        });
    })
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
        this.io.emit('DELETE_SCREAM', screamId);

        res.json({
          status: 'success',
          message: 'Scream deleted'
        });

      } else {
        return res.status(404).json({
          status: 'success',
          message: 'You cannot delete alien scream'
        });
      }
    });
  }
}

module.exports = ScreamController;