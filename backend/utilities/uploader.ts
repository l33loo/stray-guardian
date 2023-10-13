import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_PATH || "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export default multer({ storage: storage });
