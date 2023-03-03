const asyncHandler = require("express-async-handler");
const Cat = require("../models/cat");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
const sharp = require("sharp");

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

// @desc Get cat
// @route GET /api/cats
// @access Public
const getCat = asyncHandler(async (req, res) => {
  const cats = await Cat.find();

  for (const cat of cats) {
    const params = {
      Key: cat.image,
      Bucket: bucketName,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 60 * 24 });
    cat.imageUrl = url;
  }

  res.status(200).json(cats);
});

// @desc Add cat
// @route POST /api/cats
// @access Private
const addCat = asyncHandler(async (req, res) => {
  try {
    const imageName = randomImageName();
    const imageBuffer = await sharp(req.file.buffer)
      .resize({
        height: 600,
        width: 800,
      })
      .toBuffer();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: imageBuffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);

    const cat = await Cat.create({
      image: imageName,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      breed: req.body.breed,
      health: req.body.health,
      neutered: req.body.neutered,
      about: req.body.about,
      state: req.body.state,
      lastSeen: req.body.state === "Lost" ? req.body.lastSeen : null,
    });

    res.status(200).json(`Successfully added ${cat.name}`);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc Update cat
// @route PUT /api/cat
// @access Private
const updateCat = asyncHandler(async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);

    if (!cat) {
      res.status(400);
      throw new Error("Couldn't find cat");
    }

    const image = req.body.image ? req.body.image : cat.image;

    if (req.body.image != cat.image) {
      const imageBuffer = await sharp(req.file.buffer)
        .resize({
          height: 600,
          width: 800,
        })
        .toBuffer();

      const params = {
        Bucket: bucketName,
        Key: image,
        Body: imageBuffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await s3.send(command);
    }

    const updatedCat = {
      ...req.body,
      image: image,
    };

    await Cat.findByIdAndUpdate(req.params.id, updatedCat);

    res.status(200).json(`Successfully updated ${updatedCat.name}'s info`);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

// @desc Delete cat
// @route DELETE /api/cat
// @access Private
const deleteCat = asyncHandler(async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);

    const params = {
      Bucket: bucketName,
      Key: cat.image,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    await Cat.findByIdAndDelete(req.params.id);

    res.status(200).json(`Successfully deleted ${cat.name}`);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getCat,
  addCat,
  updateCat,
  deleteCat,
};
