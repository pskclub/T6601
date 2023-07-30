module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', 'unused-imports'],
  rules: {
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'interface',
        next: '*',
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'func-call-spacing': 'off',
    'func-style': 'error',
    'prefer-arrow-callback': 'error',
    'no-param-reassign': 'error',
    'dot-notation': 'error',
    'no-else-return': 'error',
    'no-multi-assign': 'error',
    radix: 'error',
    'no-new-wrappers': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['block-like', 'multiline-expression', 'multiline-const', 'multiline-let'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['block-like', 'export', 'break'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: 'expression',
      },
    ],
    'operator-linebreak': 'error',
    'no-case-declarations': 'error',
    'no-unneeded-ternary': 'error',
    'nonblock-statement-body-position': 'error',
    quotes: 'error',
    'newline-before-return': 'error',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/newline-after-import': 'error',
    'import/no-named-as-default-member': 'off',
    'no-prototype-builtins': 'off',
    'no-useless-escape': 'off',
    'prefer-regex-literals': 'off',
    'require-await': 'off',
    'unused-imports/no-unused-imports': 'error',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'any',
        math: 'any',
      },
    ],
    'vue/eqeqeq': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-reserved-props': [
      'error',
      {
        vueVersion: 3, // or 2
      },
    ],
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-html': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: ['ts', 'tsx'],
        },
      },
    ],
    'vue/component-api-style': [
      'error',
      ['script-setup'], // "script-setup", "composition", "composition-vue2", or "options"
    ],
    'vue/require-default-prop': 'off',
    'vue/no-ref-object-destructure': 'error',
    'vue/v-on-event-hyphenation': 'off',
  },
}
