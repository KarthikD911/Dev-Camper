const express = require("express");
const {
  getBootcampsInRadius,
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../Controllers/bootcamps");

const Bootcamp = require("../Models/Bootcamp");
const advancedResults = require("../Middleware/advancedResults");

// Include other resource routers
const courseRouter = require("./courses");

const router = express.Router();

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

// Generate routes and use .routes to establish connection between router and controller (MVC architecture)
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Upload photo
router.route("/:id/photo").put(bootcampPhotoUpload);

router.route("/").get(advancedResults(Bootcamp,"courses"),getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
