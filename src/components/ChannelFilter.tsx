const CHANNELS = [
  { id: "", label: "All" },
  { id: "blog", label: "Blog" },
  { id: "diary", label: "Diary" },
  { id: "tg_personal", label: "Telegram" },
  { id: "twitter", label: "Twitter/X" },
];

export default function ChannelFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (channel: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CHANNELS.map((ch) => (
        <button
          key={ch.id}
          onClick={() => onChange(ch.id)}
          style={{
            padding: "8px 18px",
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 600,
            background: active === ch.id ? "var(--text)" : "var(--surface)",
            color: active === ch.id ? "var(--bg)" : "var(--text2)",
            border: active === ch.id ? "none" : "0.5px solid var(--separator)",
            transition: "all 0.2s",
          }}
        >
          {ch.label}
        </button>
      ))}
    </div>
  );
}
