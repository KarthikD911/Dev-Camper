const express = require("express");
const {
  test,
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require("../Controllers/bootcamps");

const router = express.Router();


// Generate routes and use .routes to establish connection between router and controller (MVC architecture)

router.route("/").get(getBootcamps).post(createBootcamp);

//test please delete
router.route('/test').get(test);

router.route("/:id").get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

module.exports = router;
