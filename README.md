# BPMN.js Seed
A quick-start repo, designed to be forked and modified to create extensions and modifications to BPMN.io

# About
This project provides a baseline for creating you own modifications to BPMN,io - there are many excellent examples available on the [BPMN.io Examples Repository](https://github.com/bpmn-io/bpmn-js-examples).  But they are gathered into one large GIT repo.  This is designed to be a SEED project - a good repo to fork, and then start messing around with.

In addition to some very lightweight examples for how to extend [BPMN.js](https://github.com/bpmn-io/bpmn-js), this repo shows how to run the full BPMN Modeler in a web browser with your extension in place.  

The extension code you will be editing is located in the app/MyExtension directory.  Right now it contains:
1. SequenceFlowRenderer - this changes the color of all the lines to be a pretty blue!

## Running the Modeler

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) installed to build the project.

To install all project dependencies execute

```sh
npm install
```

To start playing around, start the server up in development mode.  Any changes you make the Javascript files will be automatically updated.

```sh
npm run dev
```

There are additional commands defined in the package.json that will let you build and share your extension via NPM so that others can incorporate your changes it into their projects. 

There are also a ton of dev-dependencies included into the package json that will allow you to create automated tests to verify your extension works.  We may add some examples on how to do this in the future.

## License
MIT
