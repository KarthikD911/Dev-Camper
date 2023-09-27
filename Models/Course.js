const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, " Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, " Please add tuition cost"],
  },
  tuition: {
    type: Number,
    required: [true, " Please add number of weeks"],
  },
  minimumSkill: {
    type: String,
    required: [true, " Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarhipsAvailable: {
    type: Boolean,
    defaule: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Static method to get avrage of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {

  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        avrageCost: { $avg: "$tuition" },
      },
    },
  ]);
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].avrageCost/10)*10
    })
  } catch (error) {
    console.error(error);
  }
};

// Call getAvrageCost after save
CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootcamp);
});

// Call getAvrageCost before remove
CourseSchema.pre("deleteOne", { document: true }, function () {
  this.constructor.getAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Course", CourseSchema);
