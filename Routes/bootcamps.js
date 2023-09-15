const express = require("express");
const {
  getBootcampsInRadius,
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../Controllers/bootcamps");

const router = express.Router();

// Generate routes and use .routes to establish connection between router and controller (MVC architecture)
router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/").get(getBootcamps).post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
