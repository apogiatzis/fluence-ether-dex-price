module.exports = {
    prefix: '',
    purge: {
      enabled: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testnet',
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('tailwindcss'),
      require('autoprefixer')
    ],
};
