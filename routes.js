const express = require("express");
const { uploadFile, download, deleteion } = require("./controllers/control");
const router = express.Router();
router.post("/upload",uploadFile);
router.post("/download",download);
router.post("/delete",deleteion)
module.exports = router;