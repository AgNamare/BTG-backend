import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import coursesRoutes from "./routes/courses.route.js";
import institutionsRoutes from "./routes/institution.route.js";
import bodyParser from "body-parser";
import userRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/courses", coursesRoutes);
app.use("/institutions", institutionsRoutes);
app.use("/user",userRoutes);

app.listen(3000, () => console.log("Server started on port 3000"));

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
    },
  });
});
