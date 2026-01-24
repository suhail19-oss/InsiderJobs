import "dotenv/config";
import "./config/instrument.js";
import express from "express";
import cors from "cors";
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

const corsOptions = {
  origin: "https://insiderjobs-client.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("OK");
});

app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebHooks);

app.get("/", (req, res) => res.send("API Working"));

app.use(clerkMiddleware());

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
