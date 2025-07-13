'use client'
import { useSession, signOut } from 'next-auth/react';

export function UserDashboard() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="absolute top-4 right-4">
      <div className="bg-gray-100 rounded-xl px-4 py-2 shadow-md text-sm text-gray-800">
        <p className="mb-1">Signed in as</p>
        <p className="font-bold">{session.user.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-2 text-red-500 hover:underline"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
