// src/app/api/search-videos/route.js

import fetch from 'node-fetch';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function POST(req) {
  const { query } = await req.json();

  const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(
    query
  )}&key=${YOUTUBE_API_KEY}&type=video`;

  const response = await fetch(youtubeApiUrl);
  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: data.error }), { status: 500 });
  }

  const videos = data.items.map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.default.url,
  }));

  return new Response(JSON.stringify({ videos }), { status: 200 });
}
