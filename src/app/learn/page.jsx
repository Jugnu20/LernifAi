"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LearnPage() {
  const [subtopics, setSubtopics] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('subtopics');
    if (stored) {
      const parsed = JSON.parse(stored);
      setSubtopics(parsed);
      fetchVideos(parsed);
    }
  }, []);

  const fetchVideos = async (topics) => {
    try {
      const res = await fetch('/api/youtube-search', {
        method: 'POST',
        body: JSON.stringify({ topics }),
      });
      const data = await res.json();
      setVideos(data.videos);
    } catch (err) {
      console.error("Error fetching videos", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Video Lectures</h1>
      {videos.length === 0 ? <p>Loading videos...</p> : (
        <ul>
          {videos.map((vid, idx) => (
            <li key={idx} className="mb-6">
              <h2 className="text-lg font-semibold">{vid.title}</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${vid.videoId}`}
                title={vid.title}
                allowFullScreen
              ></iframe>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
