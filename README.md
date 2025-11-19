# ownCloud Documentation UI

[![Build Status](http://drone.owncloud.com/api/badges/owncloud/docs-ui/status.svg)](http://drone.owncloud.com/owncloud/docs-ui)

[link-antora-default-ui]: https://gitlab.com/antora/antora-ui-default
[link-antora]: https://antora.org
[link-ui_bundle.zip]: https://minio.owncloud.com/documentation/ui-bundle.zip
[link-readme]: https://github.com/owncloud/docs
[link-git]: https://git-scm.com
[link-node]: https://nodejs.org
[link-gulp-cli]: http://gulpjs.com
[link-git-package]: https://git-scm.com/downloads
[link-nvm]: https://github.com/creationix/nvm
[link-nvm-installation-instructions]: https://github.com/creationix/nvm#installation
[link-preview]: https://github.com/owncloud/docs/blob/master/docs/build-the-docs.md#viewing-the-html-documentation

The `docs-ui` repository is a custom version of the [Antora Default UI][link-antora-default-ui], for the [Antora][link-antora] version of the ownCloud documentation.

**Table of Contents**

* [Info](#info)
* [Contributing](#contributing)
* [Prerequisites](#prerequisites)
   * [Git](#git)
   * [Node](#node)
   * [Install Dependencies](#install-dependencies)
   * [Add Packages](#add-packages)
* [Prepared npm Commands](#prepared-npm-commands)
* [Preview](#preview)
   * [Preview Changes Using the ownCloud Documentation](#preview-changes-using-the-owncloud-documentation)
   * [Previewing Changes using a Demo Antora Build](#previewing-changes-using-a-demo-antora-build)

## Info

Note that in directory `preview-site-src`, the `404.html` file is on purpose but `index.html` file is for internal testing purposes only. The file is recreated in the `public/` directory on each `preview` build and served from there. There is no need to change or copy it.

## Contributing

If you want to make changes, create a "_feature_" branch off of master, make the required changes, and then create a Pull Request (PR) against the _master_ branch.
If the PR is accepted and merged, a new `ui-bundle.zip` package file will be created and published to `https://minio.owncloud.com/documentation/ui-bundle.zip` as part of the build pipeline.

## Prerequisites

To preview the UI changes or to create a local version of a `ui-bundle.zip`, you need to install the following software on your computer.

- [git][link-git] (command: `git`)
- [Node][link-node] (command: `node`)
- [Gulp CLI][link-gulp-cli] (command: `gulp`)

### git

First, make sure you have git installed.

```Shell
git --version
```

If git is not installed, download and install the [git package][link-git-package] for your system.

### Node

Next, make sure that you have Node installed.

```Shell
node --version
```

If this command fails with an error, you don't have Node installed.
While you can install Node from the official packages, we strongly recommend that you use [NVM][link-nvm] (Node Version Manager) to install and manage Node.

Follow the [NVM installation instructions][link-nvm-installation-instructions] to set up NVM on your machine.
Once you've installed NVM, open a new terminal and install Node using the following command:

```consle
nvm ls-remote | grep "Latest LTS"

         v4.9.1   (Latest LTS: Argon)
        v6.17.1   (Latest LTS: Boron)
        v8.17.0   (Latest LTS: Carbon)
       v10.24.1   (Latest LTS: Dubnium)
      v12.22.12   (Latest LTS: Erbium)
       v14.21.3   (Latest LTS: Fermium)
       v16.20.2   (Latest LTS: Gallium)
       v18.20.4   (Latest LTS: Hydrogen)
       v20.18.1   (Latest LTS: Iron)
       v22.13.0   (Latest LTS: Jod)
```

Then install a suitable LTS version. You can install as many versions as you like or need, see example below.

```consle
nvm install 18.20.4
```

List the installed versions

```consle
nvm ls
->     v18.20.4
default -> 18.20.4 (-> v18.20.4)

...
```

**Important:** For docs, DO NOT use a version _above_ v10.23.0 and _below_ v14.17.0 as it may later conflict with other dependencies especially with the `npm run preview` command where you will get warnings and it may not work as expected.

**Info:** The backend to push to the web also uses node v16, see the `.drone.star` file. It is recommended to stay with the same release if possible.

Switch to a specific installed version of Node at any time, use the following command:

```consle
nvm use 18.20.5
```

**Important:** If you have additional concurrent terminals open, you must close these terminals first and reopen them to use the new setup.

To make a particular Node version default in new terminals, type:

```consle
nvm alias default 18.20.5
```

Now that you have Node installed, you can proceed with installing the Gulp CLI and npm.

### Install Dependencies

Finally, run the following command to install all dependencies:

```Shell
npm install
```

### Add Packages

If a new package needs to be added, type the following:

```Shell
npm -i <package-name>
```

## Prepared npm Commands

To see all prepared npm commands, run the following command `npm run`. This will output all commands with their settings, though this makes readability not easy. See the [npm documentation](https://docs.npmjs.com/cli/v11/using-npm/scripts) for more information.

Here is the list of commands and when to use them:

* `npm run lint`  
Lint the UI bundle definition
* `npm run bundle`  
Generate a new `ui-bundle.zip` file for local use
* `npm run preview`  
Preview the bundle using the gulp. This previews a demo Antora build.

## Preview

### Preview Changes Using the ownCloud Documentation

If you want to preview your changes to the UI using the ownCloud documentation instead of demo content then you need to build a local copy of `ui-bundle.zip` and use it when generating the ownCloud documentation in your local development machine.

* First create a local `ui-bundle.zip` with the command described above.
* Then change into the respective documentation repository and run `npm run antora-dev-bundle`.  
See the [Generating the Documentation](https://github.com/owncloud/docs#generating-the-documentation) description for more details.

### Previewing Changes using a Demo Antora Build

The following example runs a demo Antora **build** (_not ownCloud_) for the documentation site which can be **accessed** on your local development machine at `http://localhost:5252`.

To view your changes as you are working on them, run the following command:

```console
npm run preview
```
