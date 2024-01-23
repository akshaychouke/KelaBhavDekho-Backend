const express = require("express");
const router = express.Router();
const { UploadDetails,getDetails,getCategories,deleteCategory} = require("../Controllers/UploadController.js");
const {auth,isFarmer,isKelaGroup} = require("../Middlewares/Auth.js");

router.post("/upload",auth,isKelaGroup,UploadDetails);
router.get("/kelagroups",auth,getDetails);
router.get("/getcategories",auth,isKelaGroup,getCategories);
router.delete("/deletecategories/:id",auth,isKelaGroup,deleteCategory);
module.exports = router;
