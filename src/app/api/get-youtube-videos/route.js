// src/app/api/get-youtube-videos/route.js
import { fetchYouTubeVideos } from '@/src/utils/fetchYoutubeVideos';

export async function POST(req) {
  const { subtopics } = await req.json();

  const results = await Promise.all(
    subtopics.map(async (topic) => {
      const videos = await fetchYouTubeVideos(topic);
      return { topic, videos };
    })
  );

  return Response.json({ results });
}
