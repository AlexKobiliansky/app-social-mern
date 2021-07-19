const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Scream = require('./controllers/ScreamController');
const User = require('./controllers/UserController');
const fileUpload = require('express-fileupload');

const registrationValidation = require("./utils/validations/registration");
const loginValidation = require("./utils/validations/login");
const reduceUserDetails = require("./utils/validations/reduceUserDetails");

const checkAuth = require('./middlewares/checkAuth');

const app = express();

const PORT = config.get('port') || 4000;

app.use(fileUpload({}));
app.use(express.json({extended: true}));

app.get("/screams", Scream.index);
app.post("/screams", checkAuth, Scream.create);

app.post("/user/signup", registrationValidation, User.register);
app.post("/user/signin", loginValidation, User.login);
app.post("/user/image", checkAuth, User.uploadImage);
app.post("/user", [checkAuth, reduceUserDetails], User.addUserDetails);
app.get("/user/:id", checkAuth, User.getAuthenticatedUser);

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`App has been started! Port ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}


start();