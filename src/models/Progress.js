import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  issued: { type: Boolean, default: false },
  issuedAt: { type: Date },
  url: { type: String, default: "" }
}, { _id: false });

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
    percent: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    certificate: { type: certificateSchema, default: () => ({}) }
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });

export const Progress = mongoose.model("Progress", progressSchema);
