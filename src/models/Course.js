import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    price: { type: Number, default: 0 },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    syllabus: [
      {
        week: Number,
        topic: String,
        content: String,
      },
    ],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//  Reusable static method for search + filters
courseSchema.statics.searchCourses = function (filters) {
  const query = {};

  if (filters.keyword) {
    query.$or = [
      { title: new RegExp(filters.keyword, "i") },
      { description: new RegExp(filters.keyword, "i") },
    ];
  }

  if (filters.category) query.category = filters.category;
  if (filters.level) query.level = filters.level;

  return this.find(query).populate("instructor", "name email");
};

//  Instance method to check ownership
courseSchema.methods.isInstructor = function (userId) {
  return this.instructor.toString() === userId.toString();
};

export const Course = mongoose.model("Course", courseSchema);
