# Bocoup jQuery Training

## Pre-class setup

Before you arrive for the class, you *must* do the following:

### Install Node.js

If you already have Node.js version v0.6.0 or higher (you can check this by running `node --version` at the command line), you can skip this step.

If not, visit [nodejs.org](http://nodejs.org) and follow the installation instructions for your operating system; if you are familiar with package managers such as `brew` and `apt`, you can [follow the instructions on installing with a package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

_Note that on some systems, you  may have to restart your computer after installation._

### Install Grunt

Once you have installed Node.js, you will have a command line utility called `npm`. Open a command line prompt and type:

```bash
npm install -g grunt
```

This installs [grunt](https://github.com/cowboy/grunt), a command-line JavaScript build tool that will be used during the class.

_Note that depending on your system, you may need to do `sudo npm install -g grunt` and provide your password. If you're unsure, try it without sudo first._

## Running the Server

Once you have installed Node and Grunt, you can start a server locally. Running the server will allow you to follow along with the training material, and will be required in order to complete the exercises. To start the server:

- Open a command prompt
- Navigate to the directory that contains the training material
- Run `grunt`
- Open a browser and navigate to [http://localhost:8000](http://localhost:8000).