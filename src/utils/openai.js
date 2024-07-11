import OpenAI from "openai";
import { OPENAI_KEY } from "../utils/constants";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

// Function to handle fetch with retry logic
const fetchWithRetry = async (url, options, retries = 5, backoff = 300) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 429) {
      if (retries > 0) {
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : backoff;

        console.warn(`Too many requests. Retrying after ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        return fetchWithRetry(url, options, retries - 1, backoff * 2);
      } else {
        throw new Error("Too many requests. Max retries exceeded.");
      }
    }

    return response;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
};

export  { openai, fetchWithRetry };
