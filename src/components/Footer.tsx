export default function Footer() {
  return (
    <footer style={{
      padding: "40px 24px",
      textAlign: "center",
      fontSize: 13,
      color: "var(--text3)",
      borderTop: "0.5px solid var(--separator)",
      marginTop: 60,
      position: "relative",
      zIndex: 1,
    }}>
      DayCast Blog &middot; Powered by AI &middot;{" "}
      <a href="/api/v1/public/rss" style={{ color: "var(--text3)" }}>RSS</a>
    </footer>
  );
}
