const express = require("express");
const router = express.Router();
const { UploadDetails,getDetails } = require("../Controllers/UploadController.js");
const {auth,isFarmer,isKelaGroup} = require("../Middlewares/Auth.js");

router.post("/upload",auth,isKelaGroup,UploadDetails);
router.get("/kelagroups",auth,getDetails);
module.exports = router;
