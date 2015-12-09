# J-libre

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`
* `./node_modules/.bin/electron-rebuild`

## Running / Development

* Download [kindleguen](https://www.amazon.com/gp/feature.html?docId=1000765211) binaries & copy into:
 * `electron/app/bin/kindlegen_win32.exe`
 * `electron/app/bin/kindlegen_darwin`
 * `electron/app/bin/kindlegen_linux`
* `npm run build`

## Problems building "C++" packages in windows

Some C++ modules has to be rebuilded with the electron runtime.
To solve this just download Microsoft Visual Studio Express 2013 and execute:
* `npm install node-gyp -g`
* `cd node_modules/usb/`
* Open `binding.gyp` and add this vars:
    * module_name = 'usb_bindings'
    * module_path = './src/binding'
* `HOME=~/.electron-gyp node-gyp rebuild --target=0.33.3 --arch=x64 --dist-url=https://atom.io/download/atom-shell --msvs_version=2013`
