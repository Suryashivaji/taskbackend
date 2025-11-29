import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    tittle: { type: String, required: true },
    description: { type: String, required: true },
     isStatus: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;