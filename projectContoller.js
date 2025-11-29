import asyncHandler from "../middlewares/asyncHandler.js";
import Project from '../models/projectModel.js'

const createProject = asyncHandler(async (req, res) => {
  try {
    const { tittle, description, } = req.body;

    // Validation
    switch (true) {
      case !tittle:
        return res.json({ error: "Name is required" });
      case !description:
        return res.json({ error: "Description is required" });
    }
  const newProject = new Project({
    tittle,
    description,
    })
   
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});


export {
  createProject
}
