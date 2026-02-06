// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        sidebar: "#000000",
        primary: "#a855f7",
        secondary: "#ec4899",
        surface: "#18181b",
      },
    },
  },
  plugins: [],
};
