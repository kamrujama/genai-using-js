import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LLMChain } from "@langchain/classic/chains";

import dotenv from "dotenv";

dotenv.config();

await getPersonalizedSummary("System Design", "Javascript Developer", 100);

async function getPersonalizedSummary(course: string, role: string, wordCount: number) {
    const prompt = new PromptTemplate(
        {
            template: "Describe the importance of learning {course} for a {role}. Limit the output to {wordCount} words.",
            inputVariables: ["course", "role", "wordCount"]
        }
    )

    const formatedPrompt = await prompt.format({
        course,
        role,
        wordCount
    })

    console.log(formatedPrompt);

    const llm = new ChatGoogleGenerativeAI({
        model: "gemini-flash-lite-latest",
        apiKey: process.env.GOOGLE_API_KEY || "AIzaSyBqvawaYWHtSCXUrWCkuhGSR3l7oo037HE",
    })

    const outputParser = new StringOutputParser();

    const legacyLlmChain = new LLMChain(
        {
            prompt: prompt,
            llm,
            outputParser
        }
    )

    const answer = await legacyLlmChain.invoke({
        course,
        role,
        wordCount
    })

    console.log("Anser from legacy: ", answer);

}



