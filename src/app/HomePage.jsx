'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Loader spinner component
function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
}

export default function Home() {
  const [topic, setTopic] = useState('');
  const [parts, setParts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-subtopics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, parts }),
      });

      const data = await response.json();
      const fullText = data.subtopics || '';

      const lines = fullText.split(/\n|\\n/).map(line => line.trim());
      const cleaned = lines
        .filter(line => /^[0-9]/.test(line))
        .map(line => line.replace(/^[0-9.]+\s*/, ''));

      // Redirect to /learn/[slug]
      router.push(`/learn/${encodeURIComponent(cleaned.join('|||'))}`);
    } catch (error) {
      console.error('Error generating subtopics:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white border border-gray-200 rounded-3xl shadow-md p-8 space-y-6"
          style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
            AI Education
          </h1>

          <div>
            <label
              htmlFor="topic"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Enter Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Machine Learning"
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 text-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="parts"
              className="block mb-2 text-gray-700 font-semibold text-lg"
            >
              Number of Parts
            </label>
            <input
              id="parts"
              type="number"
              min={1}
              max={20}
              value={parts}
              onChange={(e) => setParts(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-gray-900 text-lg
                focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg transition"
          >
            Generate Course
          </button>
        </form>
      )}
    </div>
  );
}
