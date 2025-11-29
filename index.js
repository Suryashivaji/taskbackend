import express from 'express'
import dotenv from "dotenv";

//utils
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'



dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/project", projectRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));