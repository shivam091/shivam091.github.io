import { JSX } from "react";

export const metadata = {
  title: "Page Not Found"
};

export default function NotFound(): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-slate-600 mt-2">Sorry, we've misplaced that URL or it's pointing to something that doesn't exist.</p>
        <a href="/" className="btn btn-primary mt-4">Go Home</a>
      </div>
    </>
  );
}
