import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/page/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        '4xl': '2560px', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
           'custom-gradient': 'linear-gradient(to right, #120c01 60%, #120c01 60%)',
           'custom-nav-bg': 'background: linear-gradient(to right, #C79100, transparent);',
           
      },
      colors: {
        customGold: '#C79100',
        customBrown: '#8B4513',
          customDark: '#17120b',
          customWhite: '#FAFAFA',
           'gold-start': '#ffd700', 
        'gold-mid': '#bf9b30',    
        'black': '#000000'    
      },
      boxShadow: {
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      },
       fontFamily: {
    baskerville: ['Baskerville Old Face', 'serif'],
     
        segoe: ['"Segoe UI Light"', 'sans-serif'],
      
},
      
    },
  },
  plugins: [],
};
export default config;
