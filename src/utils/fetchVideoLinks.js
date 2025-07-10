// src/utils/fetchYoutubeVideos.js
export async function fetchYouTubeVideos(query) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&maxResults=3&q=${encodeURIComponent(query)}`;

  const res = await fetch(searchUrl);
  const data = await res.json();
  return data.items || [];
}
