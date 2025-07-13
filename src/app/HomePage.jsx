'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { UserDashboard } from '@/components/UserDashboard';

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
  const { data: session, status } = useSession();

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

      router.push(`/learn/${encodeURIComponent(cleaned.join('|||'))}`);
    } catch (error) {
      console.error('Error generating subtopics:', error);
    } finally {
      setIsLoading(false);
    }
  };
  <UserDashboard/>

  return (
    <div className="min-h-screen bg-white p-6 relative">
      {/* Dashboard top-right */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        {session ? (
          <>
            <p className="text-gray-800 text-sm hidden sm:block">Hi, {session.user.name}</p>
            {session.user.image && (
              <img
                src={session.user.image}
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-300"
              />
            )}
            <button
              onClick={() => signOut()}
              className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('google')}
            className="px-4 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Sign in with Google
          </button>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl shadow-md p-8 space-y-6 mt-20"
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
