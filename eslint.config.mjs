import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig({
  extends: [...nextVitals, ...nextTs],
  ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  rules: {
    'react/self-closing-comp': ['warn', { component: true, html: true }],
  },
});

export default eslintConfig;
