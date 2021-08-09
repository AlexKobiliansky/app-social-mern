const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const User = require('./controllers/UserController');
const ScreamController = require('./controllers/ScreamController');
const NotificationController = require('./controllers/NotificationController');

const fileUpload = require('express-fileupload');

const createSocket = require('./utils/socket');
const socket = require('socket.io')

const registrationValidation = require("./utils/validations/registration");
const loginValidation = require("./utils/validations/login");
const reduceUserDetails = require("./utils/validations/reduceUserDetails");
const cors = require('cors')

const checkAuth = require('./middlewares/checkAuth');

const app = express();
const server  = require('http').createServer(app);
const io = socket(server);

const Notification = new NotificationController(io);
const Scream = new ScreamController(io);

const PORT = config.get('port') || 4000;

app.use(fileUpload({}));
app.use(cors());
app.use(express.json({extended: true}));
app.use(express.static('static'));
// app.use('/static', express.static(__dirname + '/static'));



app.get("/screams", Scream.index);
app.post("/screams", checkAuth, Scream.create);
app.get("/screams/:id", Scream.getScream);
app.delete("/screams/:id", checkAuth, Scream.deleteScream);
app.post("/screams/:screamId/comments", checkAuth, Scream.commentsOnScream);
app.get("/screams/:screamId/like", checkAuth, Scream.likeScream);
app.get("/screams/:screamId/unlike", checkAuth, Scream.unlikeScream);


// app.post("/comments", checkAuth, Comment.create);

app.post("/user/signup", registrationValidation, User.register);
app.post("/user/signin", loginValidation, User.login);
app.post("/user/image", checkAuth, User.uploadImage);
app.post("/user", [checkAuth, reduceUserDetails], User.addUserDetails);
app.get("/user", checkAuth, User.getUserDetails);
app.get("/user/:id", checkAuth, User.getAuthenticatedUser);


app.post("/notifications", checkAuth, Notification.create);
app.post("/notifications/mark", checkAuth, Notification.markAsRead);
app.post("/notifications/unmark", checkAuth, Notification.markAsUnread);
app.get("/notifications", checkAuth, Notification.getNotifications);




async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    server.listen(PORT, () => console.log(`App has been started! Port ${PORT}`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}


start();