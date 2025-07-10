'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const fetchVideos = async (subtopicsString) => {
  const subtopics = decodeURIComponent(subtopicsString).split('|||').map(s => s.trim());

  const allVideos = await Promise.all(
    subtopics.map(async (topic) => {
      const res = await fetch('/api/search-videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: topic }),
      });

      const data = await res.json();
      return {
        title: topic,
        videos: data.videos || [],
      };
    })
  );

  return allVideos;
};

export default function LearnSubtopicPage() {
  const { slug } = useParams();
  const [sections, setSections] = useState([]); // sections = [{title, videos[]}, ...]

  useEffect(() => {
    if (!slug) return;

    fetchVideos(slug).then(setSections).catch(console.error);
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">🎓 Video Lectures</h1>

        {sections.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">Fetching videos for your topics...</p>
        ) : (
          sections.map((section, idx) => (
            <div key={`section-${idx}`} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">{section.title}</h2>
              {section.videos.length === 0 ? (
                <p className="text-gray-500">No videos found for this topic.</p>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {section.videos.map((video) => (
                    <li
                      key={video.videoId}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
                    >
                      <a
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:bg-gray-50"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-gray-800 font-semibold text-base line-clamp-2">{video.title}</h3>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
