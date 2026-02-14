import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Animated mesh background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 600px 600px at 20% 10%, rgba(0, 113, 227, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 500px 500px at 80% 20%, rgba(191, 90, 242, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 400px 400px at 50% 80%, rgba(255, 159, 10, 0.025) 0%, transparent 70%)
          `,
          animation: "mesh-shift 20s ease-in-out infinite, mesh-rotate 30s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          background: "var(--surface-glass)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: "0.5px solid var(--separator)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "var(--text)",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.08, rotate: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--gradient-brand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0, 113, 227, 0.2)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </motion.div>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              background: "var(--gradient-brand)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DayCast Blog
          </span>
        </Link>
        <div style={{ flex: 1 }} />
        <nav style={{ display: "flex", gap: 20 }}>
          {[
            { to: "/", label: "Feed" },
            { to: "/archive", label: "Archive" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color:
                  location.pathname === item.to
                    ? "var(--text)"
                    : "var(--text3)",
                transition: "color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/api/v1/public/rss"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text3)",
              transition: "color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            RSS
          </a>
        </nav>
      </header>

      {/* Main */}
      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
