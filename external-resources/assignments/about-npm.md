***An introduction to the npm package manager***

**Introduction to npm**

npm is the standard package manager for 
Node.js

It started as a way to download and manage dependencies of Node.js packages, but it has since become a tool used also in frontend JavaScript

npm manages downloads of dependencies of your project

**Installing all dependencies**

If a project has a package.json file, by running: `npm install`

it will install everything the project needs, in the node_modules folder, creating it if it's not existing already

**Installing a single package**

You can also install a specific package by running: `npm install <package-name>`

Often you'll see more flags added to this command: 
* `--save-dev` installs and adds the entry to the `package.json` file devDependencies
* `--no-save` installs but does not add the entry to the `package.json` file dependencies
* `--save-optional` installs and adds the entry to the `package.json` file optionalDependencies
* `--no-optional` will prevent optional dependencies from being installed

Shorthands of the flags can also be used: 
* -S: --save
* -D: --save-dev
* -O: --save-optional

difference between devDependencies and dependencies is that the former contains development tools, like a testing library, while the latter is bundled with the app in production

As for the optionalDependencies the difference is that build failure of the dependency will not cause installation to fail. But it is your program's responsibility to handle the lack of the dependency

**Updating packages**

Updating is also made easy, by running: npm update

npm will check all packages for a newer version that satisfies your versioning constraints

You can specify a single package to update as well: `npm update <package-name>`

**Versioning**

In addition to plain downloads, npm also manages versioning, so you can specify any specific version of a package, or require a version higher or lower than what you need

Many times you'll find that a library is only compatible with a major release of another library

Or a bug in the latest release of a lib, still unfixed, is causing an issue

Specifying an explicit version of a library also helps to keep everyone on the same exact version of a package, so that the whole team runs the same version until the `package.json` file is updated

In all those cases, versioning helps a lot, and npm follows the semantic versioning (semver) standard

**Running Tasks**

package.json file supports a format for specifying command line tasks that can be run by using: `npm run <task-name>`

For example: 
```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js",
  }
}
```
So instead of typing those long commands, which are easy to forget or mistype, you can run

    $ npm run watch
    $ npm run dev
    $ npm run prod

***package.json guide***

package.json file is kind of a manifest for your project. It can do a lot of things, completely unrelated. It's a central repository of configuration for tools, for example. It's also where npm and yarn store the names and versions for all the installed packages

**file structure**

Here's an example package.json file: {}

It's empty! There are no fixed requirements of what should be in a package.json file, for an application. it's only requirement is that it respects the JSON format, otherwise it cannot be read by programs that try to access its properties programmatically

If you're building a Node.js package that you want to distribute over npm things change radically, and you must have a set of properties that will help other people use it

This is another package.json: { "name": "test-project" }

It defines a name property, which tells the name of the app, or package, that's contained in the same folder where this file lives

in a more complex prject there are lots of things shows up, such as: 
* `version` indicates the current version
* `name` sets the application/package name
* `description` is a brief description of the app/package
* `main` sets the entry point for the application
* `private` if set to `true` prevents the app/package to be accidentally published on `npm`
* `scripts` defines a set of node scripts you can run
* `dependencies` sets a list of `npm` packages installed as dependencies
* `devDependencies` sets a list of `npm` packages installed as development dependencies
* `engines` sets which versions of Node.js this package/app works on
* `browserslist` is used to tell which browsers (and their versions) you want to support

All those properties are used by either npm or other tools that we can use

**Properties breakdown**

Most of those properties are only used on https://www.npmjs.com/, others by scripts that interact with your code, like npm or others

**name**

Sets the package name

Example: `"name": "test-project"`

name must be less than 214 characters, must not have spaces, it can only contain lowercase letters, hyphens (-) or underscores (_)

This is because when a package is published on npm, it gets its own URL based on this property

If you published this package publicly on GitHub, a good value for this property is the GitHub repository name

**author**

Lists the package author name: `{ "author": "Joe <joe@whatever.com> (https://whatever.com)" }`

Can also be used with this format: 
```json
{
  "author": {
    "name": "Joe",
    "email": "joe@whatever.com",
    "url": "https://whatever.com"
  }
}
```
**contributors**

As well as the author, the project can have one or more contributors. This property is an array that lists them: `{ "contributors": ["Joe <joe@whatever.com> (https://whatever.com)"] }`

Can also be used with this format:
```json
{
  "contributors": [
    {
      "name": "Joe",
      "email": "joe@whatever.com",
      "url": "https://whatever.com"
    }
  ]
}
```
**bugs**

Links to the package issue tracker, most likely a GitHub issues page: `{ "bugs": "https://github.com/whatever/package/issues" }`

**homepage**

Sets the package homepage: `{ "homepage": "https://whatever.com/package" }`

**version**

Indicates the current version of the package: `"version": "1.0.0"`

This property follows the semantic versioning (semver) notation for versions, which means the version is always expressed with 3 numbers: `x.x.x`

irst number is the major version, the second the minor version and the third is the patch version

There is a meaning in these numbers: a release that only fixes bugs is a patch release, a release that introduces backward-compatible changes is a minor release, a major release can have breaking changes

**license**

Indicates the license of the package: `"license": "MIT"`

**keywords**

This property contains an array of keywords that associate with what your package does:
```json
"keywords": [
  "email",
  "machine learning",
  "ai"
]
```
This helps people find your package when navigating similar packages, or when browsing the https://www.npmjs.com/ website

**description**

This property contains a brief description of the package: `"description": "A package to work with strings"`

This is especially useful if you decide to publish your package to npm so that people can find out what the package is about

**repository**

This property specifies where this package repository is located: `"repository": "github:whatever/testing"`

You can explicitly set the version control system: 
```json
"repository": {
  "type": "git",
  "url": "https://github.com/whatever/testing.git"
}
```
You can use different version control systems: 
```json
"repository": {
  "type": "svn",
  "url": "..."
}
```
**main**

Sets the entry point for the package

When you import this package in an application, that's where the application will search for the module exports: i.e. `"main": "src/main.js"`

**private**

if set to true prevents the app/package to be accidentally published on npm: `"private": true`

**scripts**

Defines a set of node scripts you can run:
```json
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "start": "npm run dev",
  "unit": "jest --config test/unit/jest.conf.js --coverage",
  "test": "npm run unit",
  "lint": "eslint --ext .js,.vue src test/unit",
  "build": "node build/build.js"
}
```
These scripts are command line applications. You can run them by calling `npm run XXXX` or `yarn XXXX`, where `XXXX` is the command name. Example: `npm run dev`

You can use any name you want for a command, and scripts can do literally anything you want

**dependencies**

Sets a list of npm packages installed as dependencies

When you install a package using npm or yarn: 
```bash
npm install <PACKAGENAME>
yarn add <PACKAGENAME>
```
that package is automatically inserted in this list
```json
"dependencies": {
  "vue": "^2.5.2"
}
```
**devDependencies**

Sets a list of `npm` packages installed as development dependencies

They differ from dependencies because they are meant to be installed only on a development machine, not needed to run the code in production

When you install a package using npm or yarn: 
```
npm install --save-dev <PACKAGENAME>
yarn add --dev <PACKAGENAME>
```
that package is automatically inserted in this list: 
```json
"devDependencies": {
  "autoprefixer": "^7.1.2",
  "babel-core": "^6.22.1"
}
```
**engines**

Sets which versions of Node.js and other commands this package/app work on
```json
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0",
  "yarn": "^0.13.0"
}
```
**browserslist**

Is used to tell which browsers (and their versions) you want to support. It's referenced by Babel, Autoprefixer, and other tools, to only add the polyfills and fallbacks needed to the browsers you target
```json
"browserslist": [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
]
```
This configuration means you want to support the last 2 major versions of all browsers with at least 1% of usage (from the CanIUse.com stats), except IE8 and lower

**Command-specific properties**

package.json file can also host command-specific configuration, for example for Babel, ESLint, and more

Each has a specific property, like eslintConfig, babel and others. Those are command-specific, and you can find how to use those in the respective command/project documentation

**Package versions**

You have seen in the description above version numbers like these: ~3.0.0 or ^0.13.0. What do they mean, and which other version specifiers can you use?

That symbol specifies which updates your package accepts, from that dependency

Given that using semver (semantic versioning) all versions have 3 digits, the first being the major release, the second the minor release and the third is the patch release

You can combine most of the versions in ranges, like this: 1.0.0 || >=1.1.0 <1.2.0, to either use 1.0.0 or one release from 1.1.0 up, but lower than 1.2.0

***npm global or local packages***

main difference between local and global packages is this: 
* local packages are installed in the directory where you run `npm install <package-name>`, and they are put in the `node_modules` folder under this directory
* global packages are all put in a single place in your system (exactly where depends on your setup), regardless of where you run `npm install -g <package-name>`

In your code you can only require local packages: `require('package-name');`

so when should you install in one way or another?

In general, *all packages should be installed locally*

This makes sure you can have dozens of applications in your computer, all running a different version of each package if needed

Updating a global package would make all your projects use the new release, and as you can imagine this might cause nightmares in terms of maintenance, as some packages might break compatibility with further dependencies, and so on

All projects have their own local version of a package, even if this might appear like a waste of resources, it's minimal compared to the possible negative consequences

A package should be installed globally when it provides an executable command that you run from the shell (CLI), and it's reused across projects

You can also install executable commands locally and run them using npx, but some packages are just better installed globally

Great examples of popular global packages which you might know are: `npm`, `nodemon`, `react-native-cli`, `mocha`, and so on

You probably have some packages installed globally already on your system. You can see them by running: `npm list -g --depth 0` on your command line console
