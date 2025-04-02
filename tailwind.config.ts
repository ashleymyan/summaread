import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--background-secondary))",
        },
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
        cobalt: {
          50: "#e6f1fe",
          100: "#cce3fc",
          200: "#99c7fa",
          300: "#66abf7",
          400: "#338ff5",
          500: "#1e62ab",
          600: "#184e89",
          700: "#123a67",
          800: "#0c2744",
          900: "#061322",
        },
        seafoam: {
          50: "#ebf9f5",
          100: "#d7f4ea",
          200: "#afe9d5",
          300: "#87dfc1",
          400: "#5fd4ac",
          500: "#37c997",
          600: "#2ca179",
          700: "#21795b",
          800: "#16503c",
          900: "#0b281e",
        },
        sky: {
          50: "#e6f6fe",
          100: "#cceefd",
          200: "#99dcfb",
          300: "#66cbf9",
          400: "#33b9f8",
          500: "#00a8f6",
          600: "#0086c5",
          700: "#006594",
          800: "#004362",
          900: "#002231",
        },
        mint: {
          50: "#edfdf7",
          100: "#dafbef",
          200: "#b5f7df",
          300: "#91f4cf",
          400: "#6cf0bf",
          500: "#47ecaf",
          600: "#39bd8c",
          700: "#2b8e69",
          800: "#1c5e46",
          900: "#0e2f23",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
export default config

