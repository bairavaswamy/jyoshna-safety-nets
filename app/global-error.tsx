"use client";

import { useEffect } from "react";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#ffffff", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "24px" }}>
          <div style={{ width: "100%", maxWidth: "680px", border: "1px solid #2f2f2f", borderRadius: "28px", padding: "48px 32px", textAlign: "center", background: "#111111" }}>
            <p style={{ color: "#facc15", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "13px" }}>
              Jyoshna Invisible Grills
            </p>
            <h1 style={{ margin: "18px 0 0", fontSize: "clamp(32px, 7vw, 54px)", lineHeight: 1.08 }}>
              We couldn&apos;t open this page.
            </h1>
            <p style={{ margin: "20px auto 0", maxWidth: "520px", color: "#a3a3a3", lineHeight: 1.7 }}>
              Please try once more. If the problem continues, call +91 81064 20981 or WhatsApp +91 93923 72421.
            </p>
            {error.digest && (
              <p style={{ marginTop: "16px", color: "#666666", fontSize: "12px" }}>Reference: {error.digest}</p>
            )}
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={reset}
                style={{ border: 0, borderRadius: "999px", padding: "14px 24px", background: "#facc15", color: "#000000", fontWeight: 700, cursor: "pointer" }}
              >
                Try again
              </button>
              <Link href="/" style={{ border: "1px solid #444444", borderRadius: "999px", padding: "13px 24px", color: "#ffffff", fontWeight: 700, textDecoration: "none" }}>
                Return home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
