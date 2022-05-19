# How to contribute to smooth-validator

Clone git repo in new directory called node_modules/
```sh
$ git clone git@github.com:uzrnem/smooth-validator.git
```

do your changes in index.js add validator function
then, go to test directory and add proper test cases, and rise PR to github.

and Login to npm
```sh
$ cd ./node_modules/smooth-validator/
node_modules/smooth-validator$ npm login // Login to NPM, if not already
node_modules/smooth-validator$ npm adduser
node_modules/smooth-validator$ npm whoami // check if username is correct
```

Change Version and Publish Changes
```sh
node_modules/smooth-validator$ npm version 1.0.5
node_modules/smooth-validator$ npm publish
```
