const path = require('path');
const fs = require('fs');

const express = require('express');
const bcrypt = require("bcrypt");
const axios = require("axios");
const nanoid = require("nanoid");

const config = require('../config');
const User = require('../models/User');
const auth = require('../middleware/auth');

const upload = require('../multer').avatar;

const router = express.Router();

router.post('/', upload.single('avatar'), async (req, res) => {

  if (req.file) {
    req.body.avatar = req.file.filename
  }

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
    avatar: req.body.avatar
  });

  try {
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Username or password not correct!'});
  }

  user.generateToken();

  await user.save();

  return res.send(user);
});

router.patch('/subscribe', auth, async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({username: req.body.subscribeName})
    if (user) {
      req.user.subscription.push(user._id)
    }
    await req.user.save();
    return res.send(req.user);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.patch('/profile', [auth, upload.single('avatar')], async (req, res) => {
  try {
    if (req.body.password) {
      req.user.password = req.body.password;
    }

    if (req.file) {
      const isRealPath = await fs.existsSync(config.uploadPath + '/' + req.user.avatar)
      if (req.user.avatar && isRealPath) {
          await fs.promises.unlink(path.join(config.uploadPath, req.user.avatar));
      }
      
    }

    if (req.body.displayName) {
      req.user.displayName = req.body.displayName;
    }

    if (req.body.username) {
      req.user.username = req.body.username;
      req.user.isUsernameChanged = true;
    }

    await req.user.save();
    return res.send(req.user);
  } catch (e) {
    return res.sendStatus(500);
  }
});

router.delete('/sessions', async (req, res) => {
  const success = {message: 'Success'};

  try {
    const token = req.get('Authorization').split(' ')[1];

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (e) {
    return res.send(success);
  }
});

router.post('/facebook', async (req, res) => {
  try {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const url = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(url);

    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'User ID incorrect'});
    }

    let user = await User.findOne({facebookId: req.body.id});
    
    if (!user) {
      const filename = `avatar/${nanoid()}.jpg`
      if (req.body.picture) {
        const response = await axios.get(req.body.picture.data.url, {responseType: 'stream'})
        response.data.pipe(fs.createWriteStream(`./public/${filename}`))
      }
      user = new User({
        username: req.body.id,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
        avatar: filename
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    return res.sendStatus(401);
  }
});

module.exports = router;