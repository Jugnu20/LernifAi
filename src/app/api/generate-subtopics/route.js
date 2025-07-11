// src/app/api/generate-subtopics/route.js
import { getSubtopics } from '../../../utils/cohereSubtopic';

export async function POST(req) {
  try {
    const { topic, parts } = await req.json();

    if (!topic || !parts) {
      return new Response(JSON.stringify({ error: 'Missing topic or parts' }), { status: 400 });
    }

    const subtopics = await getSubtopics(topic, parts);

    return new Response(JSON.stringify({ subtopics }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error in generate-subtopics route:', error);

    return new Response(JSON.stringify({ error: 'Failed to generate subtopics' }), {
      status: 500,
    });
  }
}
