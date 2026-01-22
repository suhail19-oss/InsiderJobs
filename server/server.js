import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebHooks } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyroutes.js";
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from "./routes/jobroutes.js";
import userRoutes from "./routes/userroutes.js";
import { clerkMiddleware } from "@clerk/express";

const app = express();
await connectDB();
await connectCloudinary();

app.use(cors());

app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebHooks);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("API Working"));
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
