const UserModel = require('../models/User');
const LikeModel = require('../models/Like');
const ScreamModel = require('../models/Scream');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const createJWToken = require("../utils/createJWToken");
const config = require('config');
const Uuid = require('uuid');

class UserController {

  register = (req, res) => {
    const postData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }

    const confirmPassword = req.body.confirmPassword;

    const errors = validationResult(req);

    if (postData.password !== confirmPassword) errors.errors.push({
      status: 'error',
      msg: 'Passwords must match',
      param: 'confirmPassword'
    });

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    postData.password = bcrypt.hashSync(req.body.password, 4);
    postData.confirmPassword = bcrypt.hashSync(req.body.password, 4);

    const user = new UserModel(postData);
    const token = createJWToken(user);

    user.save().then((obj) => {
      return res.status(201).json({
        status: 'success',
        token
      });
    }).catch(reason => {
      res.status(500).json([{
        status: 'error',
        msg: `Проблемы при регистрации: ${reason}`,
        param: 'registerError'
      }])
    });
  }

  login = (req, res) => {
    const postData = {
      email: req.body.email,
      password: req.body.password
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    UserModel.findOne({email: postData.email}, (err, user) => {
      if (err || !user) {
        return res.status(404).json([{
          status: 'error',
          msg: 'auth error: no such user',
          param: 'authError'
        }]);
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWToken(user);
        return res.json({
          status: 'success',
          token
        });
      } else {
        res.status(403).json([{
          status: 'error',
          msg: 'incorrect password or email',
          param: 'authError'
        }])
      }
    });
  }

  getAuthenticatedUser = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json([{
          status: 'error',
          msg: 'User not found',
          param: 'authError'
        }]);
      }

      ScreamModel.find({user: id}).populate('user').exec((err, screams) => {
        if (err) {
          return res.status(404).json([{
            status: 'error',
            msg: 'Error during executing users screams',
          }]);
        }

        return res.json({
          user: user,
          screams: screams
        });
      });
    })
  }

  getUserDetails = (req, res) => {
    const id = req.user._id;
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json([{
          status: 'error',
          msg: 'User not found',
          param: 'authError'
        }]);
      }

      LikeModel.find({user: id}, (err, likes) => {
        if (err) {
          return res.status(404).json([{
            status: 'error',
            msg: 'Error during executing users likes',
            param: 'authError'
          }]);
        }

        return res.json({
          credentials: user,
          likes: likes
        });
      });
    })
  }

  addUserDetails = (req, res) => {
    const postData = {
      bio: req.body.bio,
      website: req.body.website,
      location: req.body.location,
    };
    const userId = req.user._id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    UserModel.findById(userId).then(user => {
      user.bio = postData.bio;
      user.website = postData.website;
      user.location = postData.location;
      user.save().then((obj) => {
        return res.status(201).json(obj);
      }).catch(reason => {
        res.status(500).json({
          status: 'error',
          message: `Problems during adding user details: ${reason}`
        })
      });
    });
  }

  async uploadImage(req, res) {
    try {
      const file = req.files.image;
      const extension = file.name.split('.')[file.name.split('.').length - 1];

      if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return res.status(400).json({
          status: 'error',
          message: 'Wrong file type submitted'
        });
      }

      const user = await UserModel.findById(req.user._id);
      const imageName = Uuid.v4() + '.' + extension;
      file.mv(config.get('staticPath') + '/' + imageName);
      user.imageUrl = imageName;
      await user.save();
      return res.json(user);
    } catch(e) {
      return res.status(500).json({message: 'Upload image error'});
    }
  }


}

module.exports = new UserController();