const express = require("express");
const ValidationError = require("mongoose").Error.ValidationError;

const auth = require("../middleware/auth");
const upload = require("../multer").uploads;

const Photo = require("../models/Photo");

const router = express.Router();

router.get("/", async (req, res) => {
  let photos;
  try {
    if (req.query.user) {
      photos = await Photo.find({ user: req.query.user }).populate(
        "user",
        "displayName"
      );
    } else {
      photos = await Photo.find().populate("user", "displayName");
    }
    return res.send(photos);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send({
        message: "Not found",
      });
    }
    return res.send(photo);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const data = {
      user: req.user._id,
      title: req.body.title,
    };
    if (req.file) {
      data.image = req.file.filename;
    }

    const photo = new Photo(data);
    await photo.save();
    return res.send({
      id: photo._id,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      console.log(e);
      return res.sendStatus(500);
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const response = await Photo.findOneAndRemove({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!response) {
      return res.sendStatus(403);
    }
    return res.send({
      message: `${req.params.id} removed`,
    });
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
