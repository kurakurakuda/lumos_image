# Setup

1.  Initialize Package.json
    > yarn init -y
2.  Add typescript dependency
    > yarn add -D typescript
3.  Add tsconfig.json as it is necessary to compile projects to Javascript
    > yarn tsc --init --rootDir src --outDir dist
4.  Modify tcconfig.json
    ```
    {
      "name": "back-end",
      "version": "1.0.0",
      "main": "src/index.ts",
      "license": "MIT",
      "devDependencies": {
        "@types/express": "^4.17.15",
        "@types/node": "^18.11.18",
        "nodemon": "^2.0.20",
        "ts-node": "^10.9.1",
        "typescript": "^4.9.4"
      },
      "dependencies": {
        "express": "^4.18.2"
      },
      "scripts": {
        "build": "tsc",
        "start": "nodemon"
      }
    }
    ```
5.  Add Express package to build rest api
    > yarn add express
6.  Add Definitely Typed
    > yarn add -D @types/node @types/express nodemon ts-node

# Start App

> yarn start

# Express JS

[EXpress - Node.js Web application framework](https://expressjs.com/)  
[EXpress - Node.js Web アプリケーションフレームワーク(日本語版)](https://expressjs.com/ja/)

# Configu ESLint & Prettier

## ESLint

1. Install ESLint plugin
   > yarn add -D eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
2. Create .eslintrc.js with below

```
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019, // Node.js 12の場合は2019、他のバージョンのNode.jsを利用している場合は場合は適宜変更する
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
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
