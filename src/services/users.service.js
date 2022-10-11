import asyncHandler from "../middlewares/async.js";
import User from "../models/UserModel.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getAllUser = asyncHandler(async () => {
  const users = await User.find();
  return users;
});

export const getSingleUser = asyncHandler(async ({ id, next }) => {
  const user = await User.findById(id);

  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return user;
});

export const updateUserProfile = asyncHandler(async (req, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return user;
});

export const deleteUser = asyncHandler(async ({ id }) => {
  await User.findByIdAndDelete(id);
  return;
});
