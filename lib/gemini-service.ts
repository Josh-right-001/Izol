import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export interface TranslationRequest {
  text: string;
  targetLanguage: string;
  sourceLanguage?: string;
}

export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  targetLanguage: string;
}

/**
 * Translate text using Gemini API
 * Supports: English, French, Zulu, Xhosa, Swahili, Lingala, and more
 */
export async function translateWithGemini(
  request: TranslationRequest
): Promise<TranslationResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Translate the following text to ${request.targetLanguage}. 
Only provide the translation, nothing else.

Text to translate:
"${request.text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translatedText = response.text();

    return {
      originalText: request.text,
      translatedText: translatedText.trim(),
      targetLanguage: request.targetLanguage,
    };
  } catch (error) {
    console.error("[Gemini] Translation error:", error);
    throw error;
  }
}

/**
 * Batch translate multiple texts
 */
export async function translateBatch(
  texts: string[],
  targetLanguage: string
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Translate all the following texts to ${targetLanguage}.
Return them in the same order, one per line, without numbering or extra formatting.

Texts:
${texts.map((t, i) => `${i + 1}. "${t}"`).join("\n")}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response to extract individual translations
    const translations = text
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        // Remove numbering if present (e.g., "1. " or "1) ")
        return line.replace(/^\d+[\.\)]\s*/, "").trim();
      });

    return translations;
  } catch (error) {
    console.error("[Gemini] Batch translation error:", error);
    throw error;
  }
}

/**
 * Fix text styling and formatting using Gemini
 * Great for improving article text, descriptions, etc.
 */
export async function improveTextStyling(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Improve the following text by fixing grammar, punctuation, and making it more engaging while keeping the original meaning. Only return the improved text.

Original text:
"${text}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("[Gemini] Text improvement error:", error);
    throw error;
  }
}

/**
 * Generate creative descriptions using Gemini
 */
export async function generateDescription(
  subject: string,
  context: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a short, creative and engaging description for: "${subject}" in the context of ${context}. 
Keep it to 1-2 sentences. Make it captivating and relevant to the ISOLELE universe.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    return response.text().trim();
  } catch (error) {
    console.error("[Gemini] Description generation error:", error);
    throw error;
  }
}
