import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  // 前端 + Worker（Worker 的 fetch/Request/Response 等与浏览器全局同名）
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.serviceworker },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // 刻意的共享模块：组件与常量/工具混排，不适用 fast refresh 约束
  {
    files: ['src/studio/nodes/shared.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  // Node 脚本
  {
    files: ['scripts/**/*.mjs', '*.config.js', 'postcss.config.js', 'tailwind.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
)
