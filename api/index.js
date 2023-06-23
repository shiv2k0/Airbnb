const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const bcryptSalt = bcrypt.genSaltSync(12);
const jwt = require("jsonwebtoken");
const imageDownloader = require("image-downloader");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

const getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, name: userDoc.name, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.json("Password not Okay");
    }
  } else {
    res.json("not found");
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.get("/api/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/api/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/api/places", (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkout,
    maxGuests,
    price,
  } = req.body;
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkout,
        maxGuests,
        price,
      });
      res.json(placeDoc);
    });
  }
});

app.get("/api/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
    const { id } = userDoc;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Place.findById(id);
  res.json(data);
});

app.put("/api/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkout,
    maxGuests,
    price,
  } = req.body;
  const placeDoc = await Place.findById(id);
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkout,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/api/allplaces", async (req, res) => {
  res.json(await Place.find());
});

app.post("/api/booking", async (req, res) => {
  const userData = await getUserDataFromToken(req);

  const { name, phone, place, checkIn, checkout, guests, price } = req.body;
  Booking.create({
    user: userData.id,
    name,
    phone,
    place,
    checkIn,
    checkout,
    guests,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/api/bookings", async (req, res) => {
  const userData = await getUserDataFromToken(req);

  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(8080);
