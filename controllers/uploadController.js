const asyncHandler = require("express-async-handler");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;

const randomImageName = () => crypto.randomBytes(20).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// UPLOAD Image
const uploadImg = asyncHandler(async (req, res) => {
  try {
    const imageName = randomImageName();

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);

    res.status(200);
  } catch (error) {
    res.status(400).json({ message: { error } });
  }
});

module.exports = { uploadImg };
