import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'booting-bucket',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${Date.now().toString()}.jpeg`);
    },
  }),
});

export const uploadMiddleware = upload.single('file');

export const uploadController = (req, res) => {
  const { file: { location, originalname } } = req;
  try {
    if (originalname) {
      const nameSplit = originalname.split('/');
      const prevFileKey = nameSplit[nameSplit.length - 1];
      s3.deleteObject({
        Bucket: 'booting-bucket',
        Key: prevFileKey,
      }, (err, data) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.json({ location });
  }
};
