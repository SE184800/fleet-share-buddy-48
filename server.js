import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import twilio from "twilio";

const app = express();
app.use(cors());
app.use(express.json());

// ========== Cấu hình Mailtrap (Email) ==========
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "630b9513c3432b", // User Mailtrap
    pass: "c23dbfa8d3d568", // Pass Mailtrap
  },
});

// ========== Cấu hình Twilio (SMS) ==========
const twilioClient = twilio(
  "ACe457c4dd74f74afe0cecb63bc8b96250",  // 👉 lấy từ Twilio Console
  "cc7ba41af9766d0ddd39b3f0a1de37a0"    // 👉 lấy từ Twilio Console
);
const twilioPhone = "+19787880975"; // 👉 số điện thoại trial từ Twilio

// ========== API gửi OTP ==========
app.post("/send-otp", async (req, res) => {
  const { method, destination, otp } = req.body;
  // method: "email" hoặc "sms"
  // destination: email hoặc số điện thoại
  // otp: mã OTP sinh ra từ frontend

  try {
    if (method === "email") {
      // gửi OTP qua email
      await transporter.sendMail({
        from: '"EcoShare App" <noreply@ecoshare.com>',
        to: destination,
        subject: "Mã OTP xác thực EcoShare",
        text: `Mã OTP của bạn là: ${otp}`,
        html: `<h2>Xin chào</h2><p>Mã OTP của bạn là: <b>${otp}</b></p>`,
      });
    } else if (method === "sms") {
      // gửi OTP qua SMS
      await twilioClient.messages.create({
        body: `EcoShare OTP: ${otp}`,
        from: twilioPhone,
        to: destination,
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid method" });
    }

    res.json({ success: true, message: `OTP sent via ${method}` });
  } catch (err) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, error: "Send OTP failed" });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
