import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.21.0/dist/index.js";
// import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.21.0";


export const genAI = new GoogleGenerativeAI('AIzaSyC4h0-96sLwnW6pwZzzrWMT4fBDp21xZn0');
export const model = genAI.getGenerativeModel({model:"gemini-pro",
  temperature: 0.5,
});

export async function getBotMsg(prompt) {
  

  // const promt = "Who is Master Chief in under 50 words?";

  const result = await model.generateContent(prompt);
  const response  = await result.response;
  const text = response.text();

  console.log(text);
  return text;
}