import asyncHandler from "../middlewares/async.js";
import {
  AdminModel,
  StorageListing,
  UserModel,
  Services,
  StorageAccessType,
  StorageSize,
  StorageFeatures,
  StorageType,
  StorageFloor,
  StorageAccessPeriod,
  BookingPeriod,
  NoticePeriod,
} from "../models/index.js";
import ErrorResponse from "../utils/errorResponse.js";

// STORAGE LISTING
export const approveListing = asyncHandler(async ({ req, next }) => {
  let query = { ...req.body };

  if (req.body.status == "disapproved") query.completed = false;

  const storageListing = await StorageListing.findByIdAndUpdate(req.params.storageId, query, { new: true })
    .lean()
    .populate({ path: "user", select: ["email", "firstName"] });

  if (!storageListing) return next(new ErrorResponse("There is no listing with that ID", 404));
  return storageListing;
});

export const viewAllListings = asyncHandler(async () => {
  const storageListing = await StorageListing.find({ completed: true })
    .lean()
    .populate({ path: "user", select: ["firstName", "lastName", "email"] });

  return storageListing;
});

export const getAllUser = asyncHandler(async () => {
  const users = await UserModel.find();
  return users;
});

export const getUserByID = asyncHandler(async ({ req, next }) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) return next(new ErrorResponse("There is no user with that ID", 404));
  return user;
});

export const verifyPartner = asyncHandler(async ({ req, next }) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, { ...req.body });
  if (!user) return next(new ErrorResponse("There is no user with that ID", 404));
  return user;
});

export const uploadImage = asyncHandler(async ({ req, next }) => {
  let media = req.files[0].location;
  return media;
});

export const deleteUser = asyncHandler(async ({ req, next }) => {
  const user = await UserModel.findOneAndDelete(req.params.id);
  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return true;
});

export const deleteAdmin = asyncHandler(async ({ req, next }) => {
  const user = await AdminModel.findByIdAndDelete(req.params.id);
  console.log(user);
  if (!user) return next(new ErrorResponse("There is no user with that id", 404));

  return true;
});

export const getAllAdmin = asyncHandler(async () => {
  const admins = await AdminModel.find();
  return admins;
});

export const updateAdminProfile = asyncHandler(async ({ req, next }) => {
  const admin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select(["-otp", "-verifyOtpExpire"]);

  if (!admin) return next(new ErrorResponse("There is no admin with that id", 404));

  return admin;
});

// CONFIGURATIONS
export const getAllServices = asyncHandler(async () => {
  const services = await Services.find();
  return services;
});

export const createService = asyncHandler(async ({ req, next }) => {
  const { label } = req.body;

  if (!label) {
    return next(new ErrorResponse(`Please add a label`, 400));
  }

  const service = await Services.create({ label });
  return service;
});

export const updateService = asyncHandler(async ({ req, next }) => {
  const { label } = req.body;
  const service = await Services.findByIdAndUpdate(req.params.id, { label }, { new: true });

  if (!service) {
    return next(new ErrorResponse(`Service with that id cannot be found`, 404));
  }

  return service;
});

export const deleteService = asyncHandler(async (req) => {
  await Services.findByIdAndDelete(req.params.id);

  return true;
});

// STORAGE ACCESS TYPE
export const getAllStorageAccessType = asyncHandler(async () => {
  const storageAccessType = await StorageAccessType.find();
  return storageAccessType;
});

export const createStorageAccessType = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const storageAccessType = await StorageAccessType.create({ value, label });
  return storageAccessType;
});

export const updateStorageAccessType = asyncHandler(async ({ req, next }) => {
  const storageAccessType = await StorageAccessType.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!storageAccessType) {
    return next(new ErrorResponse(`storageAccessType with that id cannot be found`, 404));
  }
  return storageAccessType;
});

export const deleteStorageAccessType = asyncHandler(async (req) => {
  await StorageAccessType.findByIdAndDelete(req.params.id);
  return true;
});

// STORAGE ACCESS PERDIOD
export const getAllStorageAccessPeriod = asyncHandler(async () => {
  const storageAccessPeriod = await StorageAccessPeriod.find();
  return storageAccessPeriod;
});

export const createStorageAccessPeriod = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const storageAccessPeriod = await StorageAccessPeriod.create({ value, label });
  return storageAccessPeriod;
});

export const updateStorageAccessPeriod = asyncHandler(async ({ req, next }) => {
  const storageAccessPeriod = await StorageAccessPeriod.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );

  if (!storageAccessPeriod) {
    return next(new ErrorResponse(`storageAccessPeriod with that id cannot be found`, 404));
  }
  return storageAccessPeriod;
});

export const deleteStorageAccessPeriod = asyncHandler(async (req) => {
  await StorageAccessPeriod.findByIdAndDelete(req.params.id);
  return true;
});

// STORAGE SIZE
export const getAllStorageSize = asyncHandler(async () => {
  const storageSize = await StorageSize.find();
  return storageSize;
});

export const createStorageSize = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const storageSize = await StorageSize.create({ ...req.body });
  return storageSize;
});

export const updateStorageSize = asyncHandler(async ({ req, next }) => {
  const storageSize = await StorageSize.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!storageSize) {
    return next(new ErrorResponse(`storageSize with that id cannot be found`, 404));
  }
  return storageSize;
});

export const deleteStorageSize = asyncHandler(async (req) => {
  await StorageSize.findByIdAndDelete(req.params.id);
  return true;
});

// STORAGE FEATURES
export const getAllStorageFeatures = asyncHandler(async () => {
  const storageFeatures = await StorageFeatures.find();
  return storageFeatures;
});

export const createStorageFeatures = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const storageFeatures = await StorageFeatures.create({ ...req.body });
  return storageFeatures;
});

export const updateStorageFeatures = asyncHandler(async ({ req, next }) => {
  const storageFeatures = await StorageFeatures.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!storageFeatures) {
    return next(new ErrorResponse(`storageFeatures with that id cannot be found`, 404));
  }
  return storageFeatures;
});

export const deleteStorageFeatures = asyncHandler(async (req) => {
  await StorageFeatures.findByIdAndDelete(req.params.id);
  return true;
});

// STORAGE TYPE
export const getAllStorageType = asyncHandler(async () => {
  const storageType = await StorageType.find();
  return storageType;
});

export const createStorageType = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const storageType = await StorageType.create({ ...req.body });
  return storageType;
});

export const updateStorageType = asyncHandler(async ({ req, next }) => {
  const storageType = await StorageType.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!storageType) {
    return next(new ErrorResponse(`storageType with that id cannot be found`, 404));
  }
  return storageType;
});

export const deleteStorageType = asyncHandler(async (req) => {
  await StorageType.findByIdAndDelete(req.params.id);
  return true;
});

// STORAGE FLOOR
export const getAllStorageFloor = asyncHandler(async () => {
  const storageFloor = await StorageFloor.find();
  return storageFloor;
});

export const createStorageFloor = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const storageFloor = await StorageFloor.create({ ...req.body });
  return storageFloor;
});

export const updateStorageFloor = asyncHandler(async ({ req, next }) => {
  const storageFloor = await StorageFloor.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!storageFloor) {
    return next(new ErrorResponse(`storageFloor with that id cannot be found`, 404));
  }
  return storageFloor;
});

export const deleteStorageFloor = asyncHandler(async (req) => {
  await StorageFloor.findByIdAndDelete(req.params.id);
  return true;
});

// BOOKING PERIOD
export const getAllBookingPeriod = asyncHandler(async () => {
  const bookingPeriod = await BookingPeriod.find();
  return bookingPeriod;
});

export const createBookingPeriod = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const bookingPeriod = await BookingPeriod.create({ ...req.body });
  return bookingPeriod;
});

export const updateBookingPeriod = asyncHandler(async ({ req, next }) => {
  const bookingPeriod = await BookingPeriod.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!bookingPeriod) {
    return next(new ErrorResponse(`BookingPeriod with that id cannot be found`, 404));
  }
  return bookingPeriod;
});

export const deleteBookingPeriod = asyncHandler(async (req) => {
  await BookingPeriod.findByIdAndDelete(req.params.id);
  return true;
});

// NOTICE PERIOD
export const getAllNoticePeriod = asyncHandler(async () => {
  const noticePeriod = await NoticePeriod.find();
  return noticePeriod;
});

export const createNoticePeriod = asyncHandler(async ({ req, next }) => {
  const { value, label } = req.body;

  if (!value || !label) {
    return next(new ErrorResponse(`Please fill in all fields`, 400));
  }

  const noticePeriod = await NoticePeriod.create({ ...req.body });
  return noticePeriod;
});

export const updateNoticePeriod = asyncHandler(async ({ req, next }) => {
  const noticePeriod = await NoticePeriod.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

  if (!noticePeriod) {
    return next(new ErrorResponse(`NoticePeriod with that id cannot be found`, 404));
  }
  return noticePeriod;
});

export const deleteNoticePeriod = asyncHandler(async (req) => {
  await NoticePeriod.findByIdAndDelete(req.params.id);
  return true;
});
