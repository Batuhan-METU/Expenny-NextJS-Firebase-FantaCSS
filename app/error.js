"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="page-error-container">
      <h1>😢 Something went wrong!</h1>
      <p>{error?.message || "Unknown error occurred."}</p>
      <div className="error-buttons">
        <button className="btn btn-gray" onClick={reset}>
          Try Again
        </button>
        <Link href="/">
          <button className="btn btn-gray">Go Home</button>
        </Link>
      </div>
    </div>
  );
}
