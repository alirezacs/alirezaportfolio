"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-20 rounded-full border border-border bg-surface/80" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 items-center gap-2 rounded-full border border-border bg-surface/80 px-3 text-xs font-semibold text-ink transition hover:border-ink/20"
      aria-label="Toggle theme"
    >
      <span className="h-2 w-2 rounded-full bg-accent" />
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
