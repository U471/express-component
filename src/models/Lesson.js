import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["video", "pdf", "quiz"], required: true },
    contentUrl: { type: String, required: true }, // video/pdf/quiz link
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Lesson = mongoose.model("Lesson", lessonSchema);
