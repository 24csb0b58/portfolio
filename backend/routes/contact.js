import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = process.env.DATA_FILE
  ? path.resolve(process.cwd(), process.env.DATA_FILE)
  : path.join(__dirname, "../data/contacts.json");

const router = Router();

function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return raw ? JSON.parse(raw) : [];
}

function writeSubmissions(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

router.post("/", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: "Email is required" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Enter a valid email" });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const submissions = readSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    submittedAt: new Date().toISOString()
  };
  submissions.push(newSubmission);
  writeSubmissions(submissions);

  res.status(201).json({
    message: "Message submitted successfully!",
    submission: newSubmission
  });
});

router.get("/", (req, res) => {
  res.status(200).json(readSubmissions());
});

export default router;