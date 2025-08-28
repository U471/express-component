import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  selectedOption: { type: Number, required: true }
}, { _id: false });

const submissionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [answerSchema],
  score: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  passed: { type: Boolean, default: false }
}, { timestamps: true });

// one submission per user per quiz (optional requirement)
submissionSchema.index({ quiz: 1, user: 1 }, { unique: true });

export const QuizSubmission = mongoose.model("QuizSubmission", submissionSchema);
