import asyncHandler from "../middlewares/async.js";
import User from "../models/UserModel.js";


// Get all users
export const getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find()
    res.status(200).json({
        success: true,
        count: users.length,
        data: users,
    });
});

//Get a single user
export const getSingleUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user)
    res.status(200).json({
        success: true,
        data: user,
    });
});


// update user profile
export const UpdateUserProfile = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        success: true,
        data: user,
    });
});

//Delete User
export const deleteUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {},
    });
});