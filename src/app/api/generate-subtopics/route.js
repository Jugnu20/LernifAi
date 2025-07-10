// src/app/api/generate-subtopics/route.js
import { getSubtopics } from '../../../utils/cohereSubtopic';


export async function POST(req) {
  const { topic, parts } = await req.json();
  const subtopics = await getSubtopics(topic, parts);
  return Response.json({ subtopics });
}
