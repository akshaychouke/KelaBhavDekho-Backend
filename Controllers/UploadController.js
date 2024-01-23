const KelaGroup = require("../Model/KelaGroup.js");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//function to upload file on cloudinary
const cloudinaryFileUpload = async (file, folder) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      folder: folder,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

//Controller to save details in the database
const UploadDetails = async (req, res) => {
  const { image } = req.files;
  let { kelagroupName, email, contactNumber, currentPrice, owner } = req.body;
  currentPrice = Number(currentPrice);
  // console.log(kelagroupName, email, contactNumber, currentPrice, owner);
  // console.log(image);
  // console.log("Cloudinary configuration is ", cloudinary.config());
  try {
    const response = await cloudinaryFileUpload(
      image.tempFilePath,
      "Kelabhavdekho"
    );
    // console.log(response);
    if (!response) {
      return res.status(500).json({
        msg: "Something went wrong while uploading image to cloudinary",
      });
    }

    const newKelaRate = new KelaGroup({
      name: kelagroupName,
      email: email,
      contactNumber: contactNumber,
      currentPrice: currentPrice,
      owner: owner,
      imageURL: response.secure_url,
    });
    await newKelaRate.save();

    return res
      .status(200)
      .json({ msg: "Data saved successfully", newKelaRate });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//controller to get all kelagroups details
const getDetails = async (req, res) => {
  try {
    const kelagroups = await KelaGroup.find().populate("owner");
    console.log(kelagroups);
    return res
      .status(200)
      .json({ msg: "Kelagroups fetched successfully", kelagroups });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getCategories = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);
  try {
    const kelagroups = await KelaGroup.find({ owner: userId });
    console.log(kelagroups);
    return res
      .status(200)
      .json({ msg: "Categories fetched successfully", kelagroups });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const { ObjectId } = require("mongodb"); // Import ObjectId from the MongoDB library

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteStatus = await KelaGroup.deleteOne({ _id: new ObjectId(id) });

    if (deleteStatus.deletedCount === 1) {
      // Check if a document was actually deleted
      return res.status(200).json({
        msg: "Category successfully deleted.",
        deleteCategory: deleteStatus,
      });
    } else {
      return res.status(404).json({
        msg: "Category not found.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { UploadDetails, getDetails, getCategories, deleteCategory };
