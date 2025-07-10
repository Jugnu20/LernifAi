require('dotenv').config();
const cohere = require('cohere-ai');

cohere.init(process.env.COHERE_API_KEY);

export default async function handler(req, res) {
  const { topic, parts } = req.body;

  try {
    const prompt = `Divide the topic "${topic}" into ${parts} subtopics and explain each briefly.`;
    const response = await cohere.generate({
      model: 'command-r-plus',
      prompt,
      max_tokens: 500,
      temperature: 0.7,
    });

    const output = response.body.generations[0].text;
    res.status(200).json({ result: output });
  } catch (error) {
    console.error('❌ Cohere Error:', error);
    res.status(500).json({ error: 'Failed to generate content from Cohere.' });
  }
}
