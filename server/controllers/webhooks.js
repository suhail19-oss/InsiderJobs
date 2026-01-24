import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebHooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // 🔑 CRITICAL: pass raw body buffer + raw headers
    const evt = wh.verify(req.body, req.headers);

    const { type, data } = evt;

    if (type === "user.created") {
      const exists = await User.findById(data.id);
      if (!exists) {
        await User.create({
          _id: data.id,
          email: data.email_addresses?.[0]?.email_address || "",
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: "",
        });
      }
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        email: data.email_addresses?.[0]?.email_address || "",
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        image: data.image_url,
      });
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error.message);
    return res.status(400).json({ success: false });
  }
};
