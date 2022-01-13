module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus"],
    accessibility: ["responsive", "hover", "focus", "active", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
