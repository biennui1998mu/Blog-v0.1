import * as mongoose from 'mongoose';

const schema = mongoose.Schema;

export const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export interface User extends mongoose.Document {
  name: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
}
