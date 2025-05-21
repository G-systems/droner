module.exports = {
  content: [
    "./pages/**/*.{js,html,tsx}",
    "./src/**/*.{js,html,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
      },
      borderRadius: {
        radius: '0.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
