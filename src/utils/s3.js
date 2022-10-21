import S3 from "aws-sdk/clients/s3.js";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  maxRetries: 1,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "mooveit-aws-storage",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()} - ${file.originalname}`);
    },
  }),
});

export default upload;
