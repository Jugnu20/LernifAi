'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to LernifyAI</h1>
        <p className="text-gray-600 mb-6">Please sign in to continue</p>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}

          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
