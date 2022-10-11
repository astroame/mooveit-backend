import S3 from "aws-sdk/clients/s3";
import fs from "fs";

const s3 = new S3({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadImage = async (file) => {
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.filename,
    Body: fileStream,
  };

  return s3.upload(params).promise();
};
