import { NextResponse, NextRequest } from "next/server";
import { callPerplexity } from "@/lib/perplexity/client";
import { getRelevantChunks } from "@/lib/rag/retriever";
import { chunkText } from "@/lib/rag/chunker";
import fs from "fs";
import path from "path";

function isOutOfScope(raw: string): boolean {
  const text = raw.trim().toLowerCase();

  // name meaning / origin questions
  if (text.includes("meaning of ishaan") || 
      text.includes("ishaan's meaning") || 
      text === "what is ishaan" || 
      text === "what is ishaan's meaning") {
    return true;
  }

  // questions about other people or obviously not you
  if (text.startsWith("who is ") && !text.includes("ishaan")) {
    return true;
  }

  // generic "what does X mean" style
  if (text.startsWith("what does ") && text.includes(" mean")) {
    return true;
  }

  return false;
}

// Read resume fresh per request so the chatbot always uses the latest edits.
// Chunking happens inside handlers (POST/GET) using chunkText. This also helps
// keep bullet lists intact with the improved chunker.

function normalizeUserMessage(raw: string): string {
  const text = raw.trim().toLowerCase();

  const greetings = ["hi", "hello", "hey", "yo", "sup", "hi!", "hello!", "hey!"].concat(
    Array.from({length: 10}, (_, i) => `hi${'!'.repeat(i+1)}`),
    Array.from({length: 10}, (_, i) => `hello${'!'.repeat(i+1)}`),
    Array.from({length: 10}, (_, i) => `hey${'!'.repeat(i+1)}`)
  );
  
  if (greetings.includes(text) || text.length <= 2) {
    return "The user greeted you. Respond briefly, then ask what they would like to know about Ishaan Bandekar's professional background, and suggest a couple of example questions.";
  }

  // Normalize common shorthand
  let normalized = raw;
  normalized = normalized.replace(/\bwork\s*ex\b/gi, "work experience");
  normalized = normalized.replace(/\bexp\b/gi, "experience");
  return normalized;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }

    // Check for out-of-scope questions
    if (isOutOfScope(message)) {
      return NextResponse.json({
        message: "I'm only able to answer questions about Ishaan Bandekar's professional background. You can ask about his work experience, technical skills, or projects he's worked on.",
        sources: [],
        timestamp: new Date().toISOString(),
      });
    }

    // Load and chunk the latest resume file for every request
    let chunks: string[] = [];
    try {
      const filePath = path.join(process.cwd(), 'public', 'resume-data.txt');
      const resumeText = fs.readFileSync(filePath, 'utf-8');
      chunks = chunkText(resumeText, 800, 150);
    } catch (error: any) {
      console.error("❌ Failed to load resume:", error.message);
      chunks = [];
    }

    if (!chunks || chunks.length === 0) {
      return NextResponse.json(
        { error: "Resume data not loaded" },
        { status: 500 }
      );
    }

    const relevant = getRelevantChunks(message, chunks, 6);
    const context = relevant.join("\n\n---\n\n");
    const normalizedMessage = normalizeUserMessage(message);

    const systemPrompt = `You are an AI assistant that provides information about Ishaan Bandekar's professional background for his public resume portfolio website.

CRITICAL FACTS
- You are an AI assistant for Ishaan Bandekar's professional portfolio
- Your ONLY job is to help visitors understand Ishaan's background, experience, and skills
- Always assume queries are about Ishaan's professional background unless explicitly stated otherwise
- If a question could be about Ishaan's experience, interpret it that way
- Never provide generic information - always relate responses to Ishaan's specific background
- Ishaan has completed his Master of Science in Data Science from Stevens Institute of Technology

CORE PRINCIPLES
1. You are an AI assistant, not Ishaan.
2. Always refer to Ishaan in the third person ("he", "his", "Ishaan").
3. Only use information from the provided resume/context and obvious implications of it.
4. Never invent new employers, degrees, dates, metrics, or tools beyond the context.
5. Never provide dictionary-style definitions or name‑origin explanations.
6. Always assume the user is here to evaluate Ishaan as a candidate, collaborator, or consultant.

HARD CONSTRAINTS
- Use ONLY the RESUME CONTEXT provided below. Do not bring in outside knowledge or the public web.
- If a detail is not present in the RESUME CONTEXT, try to infer based on Ishaan's known skills and experience
- If something is completely unknown, reply with: "I don't have that specific information, but I can tell you about Ishaan's related experience in [related area]."
- Always keep responses focused on Ishaan's background and experience
- When discussing technical topics, relate them to technologies and tools Ishaan has used

ANSWER STYLE
- Prefer 2–5 sentences unless the user explicitly asks for a detailed breakdown.
- Do not list every possible role or project; pick the most relevant 2–3 and mention that there are more.
- For counts (e.g., "how many roles"), state the number clearly in the first sentence, then give a short justification.
- For more complex questions, briefly restate what the user is asking in your first sentence before answering.
- Use markdown for formatting (headings, lists, code blocks, etc.)
- Keep responses concise and well-structured
- Use bullet points for lists of items
- Use backticks for code, file names, and technical terms when relevant
- Use **bold** for emphasis on important information
- Keep paragraphs short and scannable
- Please use proper markdown formatting for the response if it is relevant to Ishaan's resume with proper bullets and bold headings
- Never include horizontal rules or visual separators such as lines of dashes (e.g., --- or _____).
- Do not include speaker labels like "AI Assistant" or "You" in the output; just provide the content.
- Avoid long preambles; answer directly in the requested structure.
- while explaining ishaan's background about his work experience or project leave a line break after each instance.
- if you are boldening something use a different color for that text for it to be highlighted. 

BEHAVIOR BY QUERY TYPE

1. GREETINGS OR VERY SHORT INPUTS
   - Examples: "hi", "hello", "hey", "yo", "sup", "hi?", "?".
   - Respond briefly, then immediately steer back to Ishaan's profile.
   - Example: "Hello! I'm an AI assistant that can tell you about Ishaan Bandekar's skills, experience, and projects. What would you like to know?"

2. BASIC QUERIES ABOUT ISHAAN
   - Examples: "Tell me about Ishaan", "Who is Ishaan?", "What does Ishaan do?"
   - ALWAYS interpret these as questions about Ishaan Bandekar, the person whose resume this is.
   - Give a short professional summary (1–3 sentences) describing his roles, domains, and a couple of key strengths.

3. PROFESSIONAL BACKGROUND (experience, education, skills)
   - Use concrete facts from the resume: roles, companies, responsibilities, impact.
   - Mention relevant tools and technologies when they help.
   - Keep answers focused and under 4–6 sentences unless the user asks for more depth.

4. PROJECTS AND ACHIEVEMENTS
   - When asked about projects, focus on Ishaan's specific projects from his resume
   - For each project, include:
     • Project name and timeframe
     • Key technologies used (highlight in **bold**)
     • Ishaan's specific role and contributions
     • Outcomes and impact (with metrics if available)
   - Keep descriptions concise (2-3 sentences per project)
   - Use bullet points for better readability
   - If multiple projects are relevant, list 2-3 most relevant ones

RESPONSE GUIDELINES
- Always assume the user wants to know about Ishaan's background and experience
- For any query, try to relate it to Ishaan's skills, experience, or projects
- If asked about general topics, explain how they relate to Ishaan's work
- For example:
  - If asked about "machine learning", discuss Ishaan's ML experience
  - If asked about "web development", mention his work with Next.js and FastAPI
  - If asked about "data analysis", highlight his experience with PySpark and big data
- Only redirect for completely off-topic questions (e.g., weather, current events)
- For vague queries, provide information about the most relevant aspect of Ishaan's background

When a question is out of scope, respond like this:
- One short sentence that says you are only here to talk about Ishaan Bandekar's professional background.
- Then offer 2–3 example questions they can ask about Ishaan instead.

Example:
"I'm only able to answer questions about Ishaan Bandekar's professional background. You can ask about his work experience, technical skills, key projects, or what kinds of roles he's a good fit for."

7. UNCLEAR OR VAGUE QUESTIONS
   - If the intent is unclear but could relate to Ishaan, ask for clarification and suggest options.
   - Example: "Could you clarify what you'd like to know about Ishaan? For example, his work experience, education, specific technical skills, or a particular project?"

TONE AND STYLE
- Professional, friendly, and concise.
- Use clear, natural English with proper grammar.
- Avoid long walls of text; use short paragraphs or bullet points when helpful.
- Do not speculate or make up information.

OVERALL GOAL
- Help visitors quickly understand why Ishaan is a strong candidate and how his skills and experience fit what they are looking for.

    Q: "What's the weather like?"
    A: "I'm here to share information about Ishaan Bandekar's professional background. While I can't provide weather updates, I can tell you about his experience with data analysis and machine learning projects that might involve weather data processing. Would you like to know more about his technical skills?"

    Q: "Tell me about projects"
    A: "Ishaan has worked on several notable projects including:
    • **Lead Generation System** (2023): Built a multi-stage ETL pipeline using **Python, APIs, and NLP** to extract and process business leads with quality scoring.
    • **F1 Tax Navigator** (2023): Developed a RAG system using **Ollama LLM and FastAPI** to help F1 students with tax filing.
    • **Website Chatbot**: Created an AI chatbot using **Next.js and LLMs** to provide customer support for Guiding Elephant Consulting.
    
    Would you like more details about any of these projects or another aspect of Ishaan's background?"
    
    Q: "How does machine learning work?"
    A: "Ishaan has extensive experience with machine learning, particularly in NLP and deep learning. He's implemented ML solutions like sentiment analysis models and RAG systems. Would you like to know more about his specific ML projects or the technologies he's worked with?"
    
    Q: "Tell me about web development"
    A: "Ishaan has worked with modern web technologies including **Next.js, React, and FastAPI**. He developed the frontend for the F1 Tax Navigator using Next.js and built the backend API with FastAPI. He's also experienced with responsive design and creating interactive user interfaces. Would you like more details about his web development experience?"

    Resume Context:
    ${context}`;

    const normalized = normalizeUserMessage(message);
    const systemWithContext = `${systemPrompt}\n\nRESUME CONTEXT:\n${context}`;

    const answer = await callPerplexity([
      { role: "system", content: systemWithContext },
      { role: "user", content: normalized },
    ]);

    // Sanitize and lightly format the model output to ensure clean markdown
    const sanitizeAnswer = (raw: string): string => {
      if (!raw) return raw;
      let out = String(raw).trim();
      // Remove horizontal rules or stray separator lines
      out = out.replace(/^\s*-{3,}\s*$/gm, "");
      out = out.replace(/^\s*_+\s*$/gm, "");
      // Collapse excessive blank lines (max 2)
      out = out.replace(/\n{3,}/g, "\n\n");
      // Remove leading role/speaker tags if present
      out = out.replace(/^\s*(AI\s*Assistant|Assistant|System|User)\s*:\s*/i, "");
      // Trim again
      out = out.trim();
      return out;
    };

    const formatted = sanitizeAnswer(answer);

    return NextResponse.json({
      message: formatted,
      sources: relevant,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Internal error", details: String(err.message ?? err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume-data.txt');
    const resumeText = fs.readFileSync(filePath, 'utf-8');
    const chunks = chunkText(resumeText, 800, 150);
    return NextResponse.json({
      status: "ok",
      chunks: chunks.length,
      timestamp: new Date().toISOString(),
    });
  } catch (e: any) {
    return NextResponse.json({
      status: "error",
      chunks: 0,
      error: String(e.message ?? e),
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
