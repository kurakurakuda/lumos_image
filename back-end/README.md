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
