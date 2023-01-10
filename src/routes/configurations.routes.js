import express from "express";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getAllStorageAccessType,
  createStorageAccessType,
  deleteStorageAccessType,
  updateStorageAccessType,
  getAllStorageSize,
  createStorageSize,
  deleteStorageSize,
  updateStorageSize,
  getAllStorageFeatures,
  createStorageFeatures,
  deleteStorageFeatures,
  updateStorageFeatures,
  getAllStorageType,
  createStorageType,
  deleteStorageType,
  updateStorageType,
  getAllStorageFloor,
  createStorageFloor,
  deleteStorageFloor,
  updateStorageFloor,
} from "../controllers/admin.controllers.js";

const router = express.Router();

import { protectAdmin, authorize } from "../middlewares/auth.js";
// import upload from "../utils/s3.js";

// Configurations that doesnt require authentication
router.route("/services").get(getAllServices);
router.route("/storage-access-type").get(getAllStorageAccessType);
router.route("/storage-size").get(getAllStorageSize);
router.route("/storage-features").get(getAllStorageFeatures);
router.route("/storage-type").get(getAllStorageType);
router.route("/storage-floor").get(getAllStorageFloor);

router.use(protectAdmin);
router.use(authorize("admin"));

// SERVICES
router.route("/services").post(createService);
router.route("/services/:id").patch(updateService).delete(deleteService);

// STORAGE ACCESS TYPE
router.route("/storage-access-type").post(createStorageAccessType);
router.route("/storage-access-type/:id").patch(updateStorageAccessType).delete(deleteStorageAccessType);

// STORAGE SIZE
router.route("/storage-size").post(createStorageSize);
router.route("/storage-size/:id").patch(updateStorageSize).delete(deleteStorageSize);

// STORAGE FEATURES
router.route("/storage-features").post(createStorageFeatures);
router.route("/storage-features/:id").patch(updateStorageFeatures).delete(deleteStorageFeatures);

// STORAGE TYPE
router.route("/storage-type").post(createStorageType);
router.route("/storage-type/:id").patch(updateStorageType).delete(deleteStorageType);

// STORAGE FLOOR
router.route("/storage-floor").post(createStorageFloor);
router.route("/storage-floor/:id").patch(updateStorageFloor).delete(deleteStorageFloor);

export default router;
