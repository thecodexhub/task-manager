import mongoose from "mongoose";

interface TaskAttrs {
  title: string;
  description?: string;
  startTime: Date;
  finishTime: Date;
  userId: string;
}

interface TaskDoc extends mongoose.Document {
  title: string;
  description?: string;
  startTime: Date;
  finishTime: Date;
  userId: string;
  createdAt: Date;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startTime: {
      type: Date,
      required: true,
    },
    finishTime: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

taskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };
