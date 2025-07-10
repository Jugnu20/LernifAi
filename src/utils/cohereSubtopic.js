// src/utils/cohereSubtopic.js
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // Make sure this is set correctly
});

export async function getSubtopics(topic, parts) {
  const prompt = `Divide the topic "${topic}" into ${parts} distinct and concise YouTube-friendly subtopics (max 6 words each). Each subtopic should focus on a specific concept and avoid repeating the same introduction. Only list the titles, no explanations.`;


  const response = await cohere.generate({
    model: 'command',
    prompt,
    maxTokens: 300,
    temperature: 0.5,
  });

  return response.generations[0].text;
}
