"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
