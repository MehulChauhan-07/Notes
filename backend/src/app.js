import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

// app.use(cors());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notes API is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
