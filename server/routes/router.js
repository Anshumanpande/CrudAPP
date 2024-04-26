const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// api for create
router.post("/register", async (req, res) => {
  try {
    const { name, email, age, mobile, work, address, description } = req.body;
    const Newuser = new users({
      name,
      email,
      age,
      mobile,
      work,
      address,
      description,
    });
    await Newuser.save();

    res
      .status(201)
      .json({ success: true, message: "User Created Successfully.", Newuser });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, message: "Interl server eror", error });
  }
});

// for get userdata
router.get("/getuserdata", async (req, res) => {
  try {
    const userdata = await users.find();
    if (!userdata) {
      return res.status(404).json({ success: false });
    }

    res.status(201).json({ userdata });
  } catch (error) {
    console.log(error);

    res.status(404).json({ success: false });
  }
});

// for individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const individualuser = await users.findOne({ _id: id });

    res.status(201).json(individualuser);
  } catch (error) {
    res.status(404).json(error);
  }
});

//update user data
router.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateuser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(201).json({
      success: true,
      message: "User updated successfully",
      updateuser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Internal server error" });
  }
});

// delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletuser = await users.findByIdAndDelete(id);
    if (!deletuser) {
      return res
        .status(404)
        .json({ success: false, message: "user Not found" });
    }
    res
      .status(201)
      .json({ success: true, message: "user Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: "Internal server error" });
  }
});

// for search

// router.get("/search/:key", async (req, res) => {
//   // const { name, email, age, mobile, work, address, description } = req.body;
//   let result = await users.find({
//     $or: [
//       { name: { $regex: req.params.key } },
//       { email: { $regex: req.params.key } },
//       { age: { $regex: req.params.key } },
//       { mobile: { $regex: req.params.key } },
//       { work: { $regex: req.params.key } },
//       { address: { $regex: req.params.key } },
//     ],
//   });
//   res.send(result);
// });

module.exports = router;
