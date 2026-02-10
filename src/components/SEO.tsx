import { useEffect } from "react";

export default function SEO({ title, description }: { title?: string; description?: string }) {
  useEffect(() => {
    document.title = title ? `${title} — DayCast Blog` : "DayCast Blog";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (description) {
      if (metaDesc) {
        metaDesc.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);

  return null;
}
