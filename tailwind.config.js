/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: [
      './app/**/*.{js,jsx,ts,tsx}', 
    './src/**/*.{js,jsx,ts,tsx}',
    './components/*.{js,jsx,ts,tsx}',
    ],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          primaryColorBg: "#121212",
          secondColorBg: "#1E1E1E",
  
          primaryColorPink: "#EE10B0",
          primaryColorPinkHover: "#D60E9E",
          lightPink: "#FDE7F7",
          lightPinkHover: "#FCDBF3",
          darkPink: "#B30C84",
          darkPinkHover: "#8F0A6A",
          darkerPink: "#53063E",
  
          colorPopover: 'rgba(58, 58, 58, 1)',
  
          primaryColorBlue: "#0E9EEF",
          primaryColorBlueHover: "#0D8ED7",
          lightBlue: "#E7F5FD",
          lightBlueHover: "#DBF0FD",
          darkBlue: "#0B77B3",
          darkBlueHover: "#085F8F",
          darkerBlue: "#053754",
  
          primaryColorGray: '#DFDFDF',
  
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          chart: {
            "1": "hsl(var(--chart-1))",
            "2": "hsl(var(--chart-2))",
            "3": "hsl(var(--chart-3))",
            "4": "hsl(var(--chart-4))",
            "5": "hsl(var(--chart-5))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        fontSize: {
          t1: ["34px", { fontWeight: "650" }],
          h1: ["28px", { fontWeight: "550" }],
          h2: ["22px", { fontWeight: "550" }],
          h3: ["18px", { fontWeight: "550" }],
          h4: ["16px", { fontWeight: "550" }],
          textBig: ["18px", { fontWeight: "200" }],
          textMedium: ["14px", { fontWeight: "200" }],
          textSmall: ["12px", { fontWeight: "100" }],
        },
        backgroundImage: {
          'custom-gradient': 'linear-gradient(to right, #1171E2 0%, #53ADD6 88%, #8BCBE7 100%)',
        },
        keyframes: {
          "caret-blink": {
            "0%,70%,100%": { opacity: "1" },
            "20%,50%": { opacity: "0" },
          },
        },
        animation: {
          "caret-blink": "caret-blink 1.25s ease-out infinite",
        },
      },
    },
    plugins: [],
  }