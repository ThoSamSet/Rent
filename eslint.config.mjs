import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/**',
      'vendor/**',
      'public/vendor/**',
      'test-results/**',
      'playwright-report/**',
      'playwright.config.js',
      'scripts/**',
      'tests/**',
      'sw.js',
      'out/**',
      '.next/**',
      'lib/*.js',
      '!lib/constants.js',
      '!lib/seo.js',
      '!lib/fonts.js',
      '!lib/image-sizes.js',
      '!lib/load-script.js',
      '!lib/gsap-cleanup.js',
      '!lib/create-legacy-page.js',
      '!lib/legacy-content.js',
    ],
  },
  {
    files: ['app/**/*.js', 'components/**/*.js', 'layouts/**/*.js', 'lib/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-console': 'off',
      eqeqeq: ['warn', 'smart'],
    },
  },
  {
    files: ['*.js', 'animations/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        gsap: 'readonly',
        ScrollTrigger: 'readonly',
        CampGsap: 'readonly',
        CampAnimCore: 'readonly',
        L: 'readonly',
      },
    },
  },
];
