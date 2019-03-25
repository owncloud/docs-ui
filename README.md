# ownCloud Documentation UI

[![Build Status](http://drone.owncloud.com/api/badges/owncloud/docs-ui/status.svg)](http://drone.owncloud.com/owncloud/docs-ui)

[link-Antora-Default-UI]: https://gitlab.com/antora/antora-ui-default
[link-Antora]: https://antora.org
[link-ui_bundle.zip]: https://minio.owncloud.com/documentation/ui-bundle.zip
[link-README]: https://github.com/owncloud/docs
[link-git]: https://git-scm.com
[link-Node-8]: https://nodejs.org
[link-Gulp-CLI]: http://gulpjs.com
[link-Yarn]: https://yarnpkg.com
[link-git-package]: https://git-scm.com/downloads
[link-nvm]: https://github.com/creationix/nvm
[link-nvm-installation-instructions]: https://github.com/creationix/nvm#installation
[link-preview]: https://github.com/owncloud/docs/blob/master/docs/build-the-docs.md#viewing-the-html-documentation


The `docs-ui` repository is a custom version of the [Antora Default UI][link-Antora-Default-UI], for the [Antora][link-Antora] version of the ownCloud documentation.

## Contributing

If you want to make changes, create a "_feature_" branch off of master, make the required changes, and then create a Pull Request (PR) against the _master_ branch.
If the PR is accepted and merged, a new `ui-bundle.zip` package file will be created and published to https://minio.owncloud.com/documentation/ui-bundle.zip as part of the build pipeline.

## Previewing Changes Locally

To view your changes as you are working on them, run the following command:

```
gulp preview
```

This will build a demo Antora (_not ownCloud_) documentation site which can be accessed on your local development machine at http://localhost:5252.

### Preview Changes Using ownCloud Documentation

If you want to preview your changes to the UI using the ownCloud documentation instead of demo content then you need to build a local copy of `ui-bundle.zip` and use it when generating the ownCloud documentation in your local development machine.

To do this, run the following command in the root directory of your `docs-ui` clone:

```
gulp pack
```

When built, the UI bundle will be available in directory `build/ui-bundle.zip`
Assuming that your local copy of the docs-ui repository is at the same level as your local copy of the docs directory, then in your docs repository’s root directory, run the following command:

```
yarn antora \
    --url http://localhost:8080 \
    --ui-bundle-url ../docs-ui/build/ui-bundle.zip 
```

Follow the [instructions][link-preview] to preview the documentation with the changes made.

## Prerequisites

To preview the UI changes or to create a local version of a `ui-bundle.zip`, you need to install the following software on your computer.

* [git][link-git] (command: `git`)
* [Node 8][link-Node-8] (command: `node`)
* [Gulp CLI][link-Gulp-CLI] (command: `gulp`)
* [Yarn][link-Yarn] (command: `yarn`)

### git

First, make sure you have git installed.

```
git --version
```

If git is not installed, download and install the [git package][link-git-package] for your system.

### Node 8

Next, make sure that you have Node 8 installed.

```
node --version
```

If this command fails with an error, you don't have Node installed.
If the command doesn't report a Node 8 version (e.g., v8.9.4), you don't have a suitable version of Node installed.
While you can install Node from the official packages, we strongly recommend that you use [NVM][link-nvm] (Node Version Manager) to install and manage Node.

Follow the [NVM installation instructions][link-nvm-installation-instructions] to set up NVM on your machine.
Once you've installed NVM, open a new terminal and install Node 8 using the following command:

```
nvm install 8
```

You can switch to this version of Node at any time using the following command:

```
nvm use 8
```

To make Node 8 the default in new terminals, type:

```
nvm alias default 8
```

Now that you have Node 8 installed, you can proceed with installing the Gulp CLI and Yarn.

### Gulp CLI

Next, you'll need the Gulp command-line interface (CLI).
This package provides the `gulp` command which executes the version of Gulp declared by the project.
You should install the Gulp CLI globally (which resolves to a location in your user directory if you're using NVM)
using the following command:

```
npm install -g gulp-cli
```

### Yarn

Your system must have installed `yarn`. If this is not the case,
[install yarn](https://yarnpkg.com/lang/en/docs/install) following the installation
notes on the referenced site.

### Install Dependencies

Finally, run the following command to install all dependencies:

```
yarn install
```
