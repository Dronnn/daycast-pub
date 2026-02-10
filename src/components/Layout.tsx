import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "var(--header-height)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        background: "var(--bg)",
        borderBottom: "0.5px solid var(--separator)",
        backdropFilter: "blur(20px)",
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--text)" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.04em" }}>DayCast Blog</span>
        </Link>
        <div style={{ flex: 1 }} />
        <nav style={{ display: "flex", gap: 20 }}>
          <Link
            to="/"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: location.pathname === "/" ? "var(--text)" : "var(--text3)",
              transition: "color 0.2s",
            }}
          >
            Feed
          </Link>
          <Link
            to="/archive"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: location.pathname === "/archive" ? "var(--text)" : "var(--text3)",
              transition: "color 0.2s",
            }}
          >
            Archive
          </Link>
          <a
            href="/api/v1/public/rss"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, fontWeight: 600, color: "var(--text3)" }}
          >
            RSS
          </a>
        </nav>
      </header>

      {/* Main */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
