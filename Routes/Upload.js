const express = require("express");
const router = express.Router();
const { UploadDetails,getDetails,getCategories} = require("../Controllers/UploadController.js");
const {auth,isFarmer,isKelaGroup} = require("../Middlewares/Auth.js");

router.post("/upload",auth,isKelaGroup,UploadDetails);
router.get("/kelagroups",auth,getDetails);
router.get("/getcategories",auth,isKelaGroup,getCategories);
module.exports = router;
