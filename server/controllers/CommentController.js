const CommentModel = require('../models/Comment');

class CommentController {
  create = (req, res) => {
    const postData = {
      user: req.body.user,
      scream: req.body.scream,
      body: req.body.body
    };

    const comment = new CommentModel(postData);

    comment
      .save()
      .then(() => {
        res.json({
          status: 'success',
          message: `Comment ${comment._id} created successfully!`
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 'error',
          message: err
        });
      });
  }
}

module.exports= new CommentController();