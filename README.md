# Nodejs with ES6 using babel plugins :

A NodeJS boilerplate for using ES6 syntax (i.e import/export, arrow functions, destructoring) with node.

Babel is a library that compiles and transforms your ES2015+(ES6) syntax into vanila JavaScript (i.e ES5) which's a code that works in current browsers.

To get started, install the basic three plugins as dev dependencies:

```bash
npm install -D @babel/core @babel/node @babel/preset-env
```

For further information about the reason behind using those dependencies, continue reading `Why we need those plugins?` or have a look to Babel's official documentation:

`https://babeljs.io/docs/en/usage`


## To get started

```bash
# Clone the project
git clone https://github.com/zalharash/nodejs-es6-babel.git

# Install dependencies
npm install

# Start it
npm start

```

### Why do we need those plugins

- @babel/core: module holds the core functionality of Babel.
As an end-user though, you'll probably want to install other tools that serve as an interface to @babel/core and integrate well with your development process, and that's why we install @babel/cli or @babel/node

- @babel/node: is a CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling with Babel presets and plugins before running it.


- @babel/preset-env: is a preset that allows us to include upcoming JS features by adding them as presets to Babel.


> @babel/preset-env is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!

Example environments: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.

Sidenote, if no targets are specified, @babel/preset-env will transform all ECMAScript 2015+ code by default(Not recommended).

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "esmodules": true,
                    "node": true
                }
            }
        ]
    ]
}
```

To use babel's plugins, either:

- Install them one by one (i.e @babel/plugin-transform-arrow-functions, ...)

```bash
npm install --save-dev @babel/plugin-transform-arrow-functions
# then run them as follow
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions

```

Now any arrow function in your code will transform to its equivlant in ES5

```js
const fn = () => 1

// converted to

var fn = function fn() {
    return 1
}
```

- Instead we can use a "@babel/preset-env" which is just a pre-determined set of plugins.

```bash
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

## babel configuration

Without any configuration, this preset will include all plugins to support modern JavaScript (ES2015, ES2016, etc.). But presets can take options too. Rather than passing both cli and preset options from the terminal, there are many options to pass those options and plugin to babel (i.e JSON file, JS file or package.json), personally I m using one of these two options:

- Using `.babelrc` file at the root of the project
- Using package.json:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    "presets": [ ],
    "plugins": [ ],
  }
}
```
