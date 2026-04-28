// src/components/islands/ThemeToggle.tsx
import { createSignal, onMount } from "solid-js";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal<Theme>("light");

  onMount(() => {
    const current = (document.documentElement.dataset.theme as Theme) ?? "light";
    setTheme(current);
  });

  const toggle = () => {
    const next: Theme = theme() === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      console.warn("Failed to persist theme preference", error);
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme() === "light" ? "Switch to dark theme" : "Switch to light theme"}
      data-theme-toggle
    >
      {theme() === "light" ? "🌙" : "☀️"}
    </button>
  );
}
