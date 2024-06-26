import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import coursesRoutes from "./routes/courses.route.js";
import institutionsRoutes from "./routes/institution.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://agnamare:USwQNKfBZD9DeLAc@cluster0.umhoehx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/institutions", institutionsRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
});
