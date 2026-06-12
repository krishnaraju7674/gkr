/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        primary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        border: "var(--border)",
        card: "var(--card-bg)",
      },
    },
  },
  plugins: [],
}

