import { User } from '../models/User.js';

export const findUserByEmail = (email) => User.findOne({ email });
export const createUser = (data) => User.create(data);
export const getUserById = (id) => User.findById(id).select('-password');
