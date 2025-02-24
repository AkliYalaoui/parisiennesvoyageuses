/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        coffee: '#614D47',
        peach: '#FFEEE2',
        warmbrown: '#A0816A',
        softpink: '#f78da7',
        softblue: '#E9FBFF',
        softyellow: '#fff9c4',
      },
    },
  },
  plugins: [],
};
