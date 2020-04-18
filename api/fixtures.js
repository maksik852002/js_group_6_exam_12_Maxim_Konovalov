const mongoose = require("mongoose");
const config = require("./config");
const User = require("./models/User");
const Photo = require("./models/Photo");
const nanoid = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, user2] = await User.create(
    {
      username: "user",
      password: "123",
      token: nanoid(),
      displayName: "Peter Falk",
    },
    {
      username: "user2",
      password: "123",
      token: nanoid(),
      displayName: "James Dean",
    }
  );

  await Photo.create(
    {
      title: "Spring",
      user: user,
      image: "uploads/fixtures/vesna.jpg",
    },
    {
      title: "Camera",
      user: user2,
      image: "uploads/fixtures/camera.jpg",
    },
    {
      title: "City",
      user: user,
      image: "uploads/fixtures/city.jpg",
    },
    {
      title: "Sport Bike",
      user: user2,
      image: "uploads/fixtures/moto.jpg",
    },
    {
      title: "Wolf",
      user: user,
      image: "uploads/fixtures/wolf.jpg",
    },
    {
      title: "Beautiful Sunset",
      user: user2,
      image: "uploads/fixtures/zakat.jpg",
    },
    {
      title: "Abstraction",
      user: user,
      image: "uploads/fixtures/abstract.jpg",
    },
    {
      title: "Fog",
      user: user2,
      image: "uploads/fixtures/fog.jpg",
    }
  );

  mongoose.connection.close();
};

run().catch((e) => {
  mongoose.connection.close();
  throw e;
});
