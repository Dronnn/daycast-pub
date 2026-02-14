const CHANNEL_GRADIENTS: Record<string, [string, string]> = {
  blog: ["#0071e3", "#00c6fb"],
  diary: ["#bf5af2", "#ff6bcb"],
  tg_personal: ["#2aabee", "#229ed9"],
  tg_public: ["#2aabee", "#229ed9"],
  twitter: ["#1d1d1f", "#555"],
};

const CHANNEL_LETTERS: Record<string, string> = {
  blog: "B",
  diary: "D",
  tg_personal: "T",
  tg_public: "T",
  twitter: "X",
};

export default function ChannelIcon({ channelId, size = 40 }: { channelId: string | null; size?: number }) {
  const [c1, c2] = (channelId && CHANNEL_GRADIENTS[channelId]) || ["#888", "#aaa"];
  const letter = (channelId && CHANNEL_LETTERS[channelId]) || channelId?.[0]?.toUpperCase() || "P";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.35,
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: size * 0.42,
        fontWeight: 900,
        letterSpacing: "-0.02em",
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {letter}
    </div>
  );
}
