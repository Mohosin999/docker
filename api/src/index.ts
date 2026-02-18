import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  console.log("Health checked");
  res.status(200).json({ status: "UP", path: req.path });
});

// // 404 handler
// app.use((_req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// // Error handler
// app.use((err, _req, res, _next) => {
//   console.log(err.stack);
//   res.status(500).json({ message: "Internal server error" });
// });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
