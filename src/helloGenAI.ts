import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const llm = new ChatGoogleGenerativeAI({
  model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest",
  apiKey: process.env.GOOGLE_API_KEY || "AIzaSyBqvawaYWHtSCXUrWCkuhGSR3l7oo037HE",
});

const response: any = await llm.invoke(
  "Describe the importance of learning generative AI for javascript developers in 50 words."
);

console.log(response.content);
