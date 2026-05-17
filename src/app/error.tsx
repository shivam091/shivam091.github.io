"use client";

import { JSX, useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50">
        <h2 className="text-2xl font-bold text-red-700">Something went wrong!</h2>
        <button className="btn btn-secondary mt-4" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </>
  );
};
