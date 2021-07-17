const ScreamModel = require('../models/Scream');

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

    console.log(req.body)
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
}

module.exports= new ScreamController();