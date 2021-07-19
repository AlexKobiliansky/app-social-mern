const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const Scream = require('./controllers/ScreamController');
const User = require('./controllers/UserController');

const registrationValidation = require("./utils/validations/registration");
const loginValidation = require("./utils/validations/login");

const app = express();

const PORT = config.get('port') || 4000;

app.use(express.json({extended: true}));

app.get("/screams", Scream.index);
app.post("/screams", Scream.create);

app.post("/user/signup", registrationValidation, User.register);
app.post("/user/signin", loginValidation, User.login);

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