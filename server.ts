import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Assistant
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in secrets. Please configure it in your Settings > Secrets menu." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare contents list from history + new message
      // history items format: { role: "user" | "model", text: string }
      const contents = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          if (h.role && h.text) {
            contents.push({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.text }]
            });
          }
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: `You are Kojo, the official AI Academic Assistant for Kumasi Technical University (KsTU) in Kumasi, Ghana.
You help students, lecturers, and staff with academic tutoring, summarizing notes, assignment ideas, course roadmap questions, and FAQs about KsTU.
KsTU details:
- Faculties:
  1. Faculty of Engineering (Computer Engineering, Civil, Electrical, Mechanical, etc.)
  2. Faculty of Applied Sciences (Computer Science, Information Technology, Statistics, etc.)
  3. Faculty of Business (Marketing, Procurement & Supply Chain, Accountancy, etc.)
  4. Faculty of Built and Natural Environment (Building Technology, Estate Management, etc.)
  5. Faculty of Health Sciences (Medical Laboratory Technology, Dispensing Technology, Nursing, etc.)
  6. Faculty of Creative Arts and Technology (Fashion Design, Hospitality, etc.)
- KsTU Location: Kumasi, Ashanti Region, Ghana. Near the Kumasi Cultural Centre and Kumasi Zoo.
- Tone: Friendly, Ghanaian-inclusive, encouraging, professional. Feel free to use occasional light local expressions like 'Akwaaba' (Welcome), 'Chale' (friend), 'Ei', or 'Medaase' (Thank you) where appropriate, but keep explanations academically rigorous, accurate, and structured with clean markdown.
- Give rich, detailed answers, recommending study methodologies and structured notes where requested.`
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini AI API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred with the AI assistant" });
    }
  });

  // Serve static assets or use Vite in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KsTU Connect backend listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start full-stack server:", err);
});
