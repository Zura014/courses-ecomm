/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
    colors: {
      primary: "#F14D5D",
      secondary: "#015ABD",
      heading: "#14133b",
      text: "#77838F",
      white: "#fff",
      borderC: "#ddd"
    },
    screens: {
      xs: "420px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      fontFamily: {
        primaryFont: ["GilRoy", "sans-serif"],
        secondaryFont: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [ 
  ],
}