import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["active", "cancelled"], default: "active" }
  },
  { timestamps: true }
);

// prevent duplicate enrollments
enrollmentSchema.index({ course: 1, student: 1 }, { unique: true });

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
