/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [
        nextui({
            prefix: 'nextui', // prefix for themes variables
            addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
            defaultTheme: 'light', // default theme from the themes object
            defaultExtendTheme: 'light', // default theme to extend on custom themes
            layout: {}, // common layout tokens (applied to all themes)
            themes: {
                light: {
                    layout: {}, // light theme layout tokens
                    colors: {
                        primary: '#229799',
                        secondary: '#48CFCB',
                        content1: '#424242',
                        background: '#F5F5F5',
                    }, // light theme colors
                },
                dark: {
                    layout: {}, // dark theme layout tokens
                    colors: {}, // dark theme colors
                },
                // ... custom themes
            },
        }),
        function ({ addUtilities }) {
          addUtilities({
              '.scrollbar-thin': {
                  '&::-webkit-scrollbar': {
                      width: '6px',
                      marginTop: '2px',
                      marginBottom: '2px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#d1d5db',
                      borderRadius: '6px',
                  },
                  '&::-webkit-scrollbar-track': {
                      backgroundColor: 'transparent',
                  },
              },
          });
      },
    ],
};
