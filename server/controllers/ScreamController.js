const ScreamModel = require('../models/Scream');
const CommentModel = require('../models/Comment');

class ScreamController {

  index = (req, res) => {
    ScreamModel.find().sort({createdAt: -1})
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
      userHandle: req.body.userHandle,
      body: req.body.body
    };

    const scream = new ScreamModel(postData);

    scream
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
}

module.exports= new ScreamController();