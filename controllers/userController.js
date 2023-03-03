const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require("sharp");
const crypto = require("crypto");

const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const randomImageName = () => crypto.randomBytes(16).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// Register User
// POST
const userRegister = asyncHandler(async (req, res) => {
  try {
    const { username, password, access } = req.body;

    const userExist = await User.findOne({ username });

    if (userExist) {
      res.status(400);
      throw new Error("A user with that username already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      username,
      nickname: username,
      password: hashedPassword,
      access,
      image: "image",
    });

    if (user) {
      const userData = {
        _id: user.id,
        username: user.username,
        nickname: user.nickname,
        access: user.access,
        image: user.image,
        token: generateToken(user._id),
      };
      res.status(201).json(`Successfully registered user:${userData.username}`);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// Get All Users
// GET
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  for (const user of users) {
    user.username = "";
    user.password = "";
    user.joined = user.createdAt.toString().slice(0, 15);
    if (user.image != "image") {
      const params = {
        Key: user.image,
        Bucket: bucketName,
      };
      const command = new GetObjectCommand(params);
      const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });
      user.imageUrl = url;
    }
  }

  res.status(200).json(users);
});

// Get User Data
// GET
const userData = asyncHandler(async (req, res) => {
  const { _id, username, nickname, access, image, createdAt } =
    await User.findById(req.user.id);

  let url = "";

  if (image != "image") {
    const params = {
      Key: image,
      Bucket: bucketName,
    };
    const command = new GetObjectCommand(params);
    url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });
  }

  if (_id) {
    res.status(200).json({
      id: _id,
      username,
      nickname,
      access,
      image,
      imageUrl: url,
      joined: createdAt.toString().slice(0, 15),
    });
  } else {
    res.status(400);
    throw new Error("Timed Out!");
  }
});

// User Login
// POST
const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.cookie(
      "token",
      { token: generateToken(user._id) },
      { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 1 }
    );
    res.json({
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Name/Password, please try again.");
  }
});

// Update User
// PUT
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Change Password
    if (req.body.type === "change password") {
      const { oldPassword, newPassword } = req.body;

      if (await bcrypt.compare(oldPassword, user.password)) {
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        res.cookie(
          "token",
          { token: generateToken(user._id) },
          { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 1 }
        );

        const updatedPassword = {
          password: hashedPassword,
        };

        await User.findByIdAndUpdate(req.params.id, updatedPassword);
      } else {
        res.status(400).json("Invalid old password");
      }

      res.status(200).json("Password changed successfully");
    }

    // Change Details/Image / Upload Image
    if (req.body.type === "update details") {
      const imageName = randomImageName();
      const image = req.body.image ? req.body.image : user.image;

      if (req.body.image != user.image) {
        const imageBuffer = await sharp(req.file.buffer)
          .resize({
            height: 600,
            width: 800,
          })
          .toBuffer();

        const params = {
          Bucket: bucketName,
          Key: image === "image" ? imageName : image,
          Body: imageBuffer,
          ContentType: req.file.mimetype,
        };
        const command = new PutObjectCommand(params);

        await s3.send(command);
      }

      const updatedUser = {
        ...req.body,
        image: image === "image" ? imageName : image,
      };

      await User.findByIdAndUpdate(req.params.id, updatedUser);

      res.status(200).json("Details updated successfully");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Logout
// GET
const userLogout = asyncHandler(async (req, res) => {
  await res.clearCookie("token");
  res.status(200).json();
});

// Delete User
// DELETE
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const params = {
      Bucket: bucketName,
      Key: user.image,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: `Successfully deleted ${user.name}` });
  } catch (error) {
    throw new Error(error);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  getUsers,
  userRegister,
  userLogin,
  userData,
  userLogout,
  deleteUser,
  updateUser,
};
