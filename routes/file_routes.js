const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/uploads`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
})

// Create the Multer middleware for file upload
const upload = multer({ storage: storage })

// Handle file upload via POST request
router.post('/uploadFile', upload.single('file'), (req, res, next) => {
  res.json({ "filename": req.file.filename }) // Respond with the uploaded file's name
});

// router get
const downloadFile = (req, res) => {
  const fileName = req.params.filename;
  const path = __basedir + "/uploads/";

  // Define a function to handle file download
  res.download(path + fileName, (err) => {
    if (err) {
      // Handle errors during file download
      res.status(500).send({ message: "file cannot be dowloaded" + err })
    }
  })
};

// Route for downloading files
router.get("/files/:filename", downloadFile);

module.exports = router;