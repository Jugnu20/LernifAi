require('dotenv').config();
const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function generate() {
  try {
    const response = await cohere.chat({
      model: 'command-r',
      message: 'List subtopics for "Artificial Intelligence"',
    });

    console.log('📘 Response:\n', response.text);
  } catch (error) {
    console.error('❌ Cohere API Error:', error);
  }
}

generate();
