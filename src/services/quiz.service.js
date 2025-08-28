import { Quiz } from "../models/Quiz.js";
import { QuizSubmission } from "../models/QuizSubmission.js";
import { Lesson } from "../models/Lesson.js";
import { Course } from "../models/Course.js";
import { Forbidden, NotFoundErr, Conflict } from "../utils/AppError.js";
import mongoose from "mongoose";

export const createQuiz = async (user, { lessonId, title, questions }) => {
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) throw NotFoundErr("Lesson not found");

  const course = await Course.findById(lesson.course);
  if (!course) throw NotFoundErr("Course not found");

  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to create quiz for this lesson");
  }

  const quiz = await Quiz.create({
    lesson: lessonId,
    title,
    questions,
    createdBy: user.id
  });

  return quiz;
};

export const updateQuiz = async (user, quizId, data) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw NotFoundErr("Quiz not found");

  const lesson = await Lesson.findById(quiz.lesson);
  const course = await Course.findById(lesson.course);
  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to update this quiz");
  }

  Object.assign(quiz, data);
  await quiz.save();
  return quiz;
};

export const deleteQuiz = async (user, quizId) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw NotFoundErr("Quiz not found");

  const lesson = await Lesson.findById(quiz.lesson);
  const course = await Course.findById(lesson.course);
  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to delete this quiz");
  }

  await quiz.deleteOne();
};

export const getQuizByLesson = async (lessonId) => {
  return Quiz.findOne({ lesson: lessonId });
};

// submit and auto-grade
export const submitQuiz = async (user, quizId, answers = []) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw NotFoundErr("Quiz not found");

  // optional: ensure user enrolled in course
  const lesson = await Lesson.findById(quiz.lesson);
  const course = await Course.findById(lesson.course);

  // grade
  const total = quiz.questions.length;
  let score = 0;
  // create a map for correctOption by question _id (string)
  const correctMap = new Map(quiz.questions.map(q => [q._id.toString(), q.correctOption]));

  for (const ans of answers) {
    const qid = ans.questionId.toString();
    const selected = ans.selectedOption;
    const correct = correctMap.get(qid);
    if (typeof correct !== "undefined" && correct === selected) score++;
  }

  const passed = total === 0 ? false : (score / total) >= 0.5; // pass threshold 50% (configurable)
  const submissionData = {
    quiz: quizId,
    user: user.id,
    answers,
    score,
    total,
    passed
  };

  // upsert submission (if you want one submission per user)
  try {
    const submission = await QuizSubmission.create(submissionData);
    return submission;
  } catch (e) {
    // if unique index violation (user already submitted) throw conflict
    if (e.code === 11000) {
      throw Conflict("You have already submitted this quiz");
    }
    throw e;
  }
};

export const getSubmissions = async (user, quizId) => {
  const quiz = await Quiz.findById(quizId);
  if (!quiz) throw NotFoundErr("Quiz not found");

  const lesson = await Lesson.findById(quiz.lesson);
  const course = await Course.findById(lesson.course);
  if (!course.isInstructor(user.id) && user.role !== "admin") {
    throw Forbidden("Not authorized to view submissions");
  }

  return QuizSubmission.find({ quiz: quizId }).populate("user", "name email");
};
