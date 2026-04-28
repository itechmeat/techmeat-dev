// src/components/islands/ThemeToggle.tsx
//
// The icon is driven by CSS (`:root[data-theme="dark"]` selector), not by a
// Solid signal, so the correct icon paints on first render — including SSR
// and the no-FOUC bootstrap script in BaseLayout. There is no flash from
// "moon → sun" after hydration.

export default function ThemeToggle() {
  const toggle = () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      console.warn("Failed to persist theme preference", error);
    }
  };

  return (
    <button type="button" onClick={toggle} aria-label="Toggle theme" data-theme-toggle>
      <span class="theme-icon theme-icon-light" aria-hidden="true">
        🌙
      </span>
      <span class="theme-icon theme-icon-dark" aria-hidden="true">
        ☀️
      </span>
    </button>
  );
}
