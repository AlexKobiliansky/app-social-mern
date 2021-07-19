const UserModel = require('../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const createJWToken = require("../utils/createJWToken");
const config = require('config');
const Uuid = require('uuid');

class UserController {

  // index = (req, res) => {
  //   ScreamModel.find().sort({createdAt: -1})
  //     .exec(function (err, screams) {
  //       if (err) {
  //         return res.status(404).json({
  //           status: 'error',
  //           message: err
  //         });
  //       }
  //       return res.json(screams);
  //     });
  // }


  register = (req, res) => {
    const postData = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
      // handle: req.body.handle,
    }

    const errors = validationResult(req);

    if (postData.password !== postData.confirmPassword) errors.errors.push({msg: 'Passwords must match'});

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    // const noImgUrl = 'https://msk.pohudejkina.ru/wp-content/plugins/userswp/assets/images/no_profile.png';

    postData.password = bcrypt.hashSync(req.body.password, 4);
    postData.confirmPassword = bcrypt.hashSync(req.body.password, 4);
    // postData.imageUrl = noImgUrl;

    const user = new UserModel(postData);

    user.save().then((obj) => {
      return res.status(201).json(obj);
    }).catch(reason => {
      res.status(500).json({
        status: 'error',
        message: `Проблемы при регистрации: ${reason}`
      })
    });
  }

  login = (req, res) => {
    const postData = {
      email: req.body.email,
      password: req.body.password
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    UserModel.findOne({email: postData.email}, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          status: 'error',
          message: 'auth error: no such user'
        });
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWToken(user);
        return res.json({
          status: 'success',
          token
        });
      } else {
        res.status(403).json({
          status: 'error',
          message: 'incorrect password or email!'
        })
      }
    });
  }

  async uploadImage(req, res) {
    try {
      const file = req.files.image;
      const user = await UserModel.findById(req.user._id);
      const imageName = Uuid.v4() + '.jpg';
      file.mv(config.get('staticPath') + '/' + imageName);
      user.imageUrl = imageName;
      await user.save();
      return res.json(user);
    } catch(e) {
      console.log(e);
      return res.status(500).json({message: 'Upload image error'});
    }
  }
}

module.exports = new UserController();