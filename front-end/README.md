# Setup

1. Create react app with typescript

   > npx create-react-app --template typescript "name"

2. Install p5.js
   > yarn add p5 @types/p5

# Start App

> yarn start

# Reference

## p5js

[p5js.jp](https://p5js.jp/)  
[p5.js Brightness](https://p5js.org/examples/image-brightness.html)

# Socket IO

[rfc6455 - The WebSocket Protocol](https://www.rfc-editor.org/rfc/rfc6455)  
[socket.io](https://socket.io/docs/v4/)

# Configu ESLint & Prettier

## ESLint

1. Install ESLint plugin
   > yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
2. Create .eslintrc.js with below

```
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    //'plugin:react/recommended', airbnbにほど設定されているので削除可能
    'airbnb',
    'airbnb-typescript', //追加
    'airbnb/hooks', //追加
    'plugin:@typescript-eslint/recommended', //型を必要としないプラグインの推奨ルールをすべて有効
    'plugin:@typescript-eslint/recommended-requiring-type-checking', //型を必要とするプラグインの推奨ルールをすべて有効
    'prettier' //追加 ESLintの情報に沿ってフォーマット
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12, //latestから12に変更
    sourceType: 'module',
    tsconfigRootDir: __dirname, //追加 tsconfig.jsonがある相対パスを指定
    project: ['./tsconfig.json'] //追加  tsconfig.jsonを指定
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'unused-imports' //追加 使っていないimportを自動で削除用
  ],
  ignorePatterns: ['build'], //追加 .eslintignoreに対象外にしているが無いとコンパイルに時間がかかる
  /*-- ↓以下追加 --*/
  rules: {
    'no-use-before-define': 'off', //関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': ['error'], //typescript側のno-use-before-defineを使うようにする
    'import/prefer-default-export': 'off', //named exportがエラーになるので使えるようにoff
    '@typescript-eslint/no-unused-vars': 'off', //unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', //不要なimportの削除
    'unused-imports/no-unused-vars': [
      //unused-importsでno-unused-varsのルールを再定義
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    'react/function-component-definition': [
      //アロー関数以外受け付けない設定
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'import/extensions': [
      //importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'react/jsx-filename-extension': [
      //jsx形式のファイル拡張子をjsxもしくはtsxに限定
      'error',
      {
        extensions: ['.jsx', '.tsx']
      }
    ],
    'react/react-in-jsx-scope': 'off', //import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', //TypeScriptでチェックしているから不要。offにする
    'no-void': [
      //void演算子の許可
      'error',
      {
        allowAsStatement: true
      }
    ]
  },
  settings: {
    'import/resolver': {
      //importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
  /*-- ↑追加ここまで --*/
};

```

3. Modify package.json to run eslint by npm command
   > "lint": "eslint --ext 'src/\*_/_.{js,jsx,ts,tsx}'" // add this in "scripts"

## Prettier

1. Install Prettier plugin
   > yarn add -D --save-exact prettier eslint-config-prettier
2. Create .prettierrc with below

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "none",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid",
  "rangeStart": 0,
  "filepath": "none",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "auto"
}
```

3. Create .prettierignore with below

```
# Ignore artifacts:
/dist
node_modules
package.json
package-lock.json
tsconfig.json
tsconfig.eslint.json
```

4. Add Prettier config to "extends" in .eslintrc.js

```
extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'  // add this
  ],
```
