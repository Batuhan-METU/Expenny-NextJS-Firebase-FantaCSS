"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page404-container">
      <h1>Page not found :(</h1>
      <p className="text-notFound">404</p>

      <Link href={"/"}>
        <button
          style={{
            backgroundColor: "#a78bfa",
            color: "white",
            height: "50px",
            width: "100%",
          }}
        >
          Home
        </button>
      </Link>
    </div>
  );
}
