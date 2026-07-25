/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6366F1",
        accent: "#818CF8",
        background: "#F8FAFC",
      },

      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },

      boxShadow: {
        card: "0 10px 30px rgba(15,23,42,0.08)",
      },
    },
  },

  plugins: [],
};