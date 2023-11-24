# ownCloud Documentation UI

[![Build Status](http://drone.owncloud.com/api/badges/owncloud/docs-ui/status.svg)](http://drone.owncloud.com/owncloud/docs-ui)

[link-antora-default-ui]: https://gitlab.com/antora/antora-ui-default
[link-antora]: https://antora.org
[link-ui_bundle.zip]: https://minio.owncloud.com/documentation/ui-bundle.zip
[link-readme]: https://github.com/owncloud/docs
[link-git]: https://git-scm.com
[link-node]: https://nodejs.org
[link-gulp-cli]: http://gulpjs.com
[link-yarn]: https://yarnpkg.com
[link-git-package]: https://git-scm.com/downloads
[link-nvm]: https://github.com/creationix/nvm
[link-nvm-installation-instructions]: https://github.com/creationix/nvm#installation
[link-preview]: https://github.com/owncloud/docs/blob/master/docs/build-the-docs.md#viewing-the-html-documentation

The `docs-ui` repository is a custom version of the [Antora Default UI][link-antora-default-ui], for the [Antora][link-antora] version of the ownCloud documentation.

**Table of Contents**

* [Contributing](#contributing)
* [Prerequisites](#prerequisites)
   * [Git](#git)
   * [Node](#node)
   * [Yarn](#yarn)
   * [Install Dependencies](#install-dependencies)
   * [Add Packages](#add-packages)
* [Prepared Yarn Commands](#prepared-yarn-commands)
* [Preview](#preview)
   * [Preview Changes Using the ownCloud Documentation](#preview-changes-using-the-owncloud-documentation)
   * [Previewing Changes using a Demo Antora Build](#previewing-changes-using-a-demo-antora-build)
   * [Preview Using the Seach Bar](#preview-using-the-seach-bar)

## Contributing

If you want to make changes, create a "_feature_" branch off of master, make the required changes, and then create a Pull Request (PR) against the _master_ branch.
If the PR is accepted and merged, a new `ui-bundle.zip` package file will be created and published to `https://minio.owncloud.com/documentation/ui-bundle.zip` as part of the build pipeline.

## Prerequisites

To preview the UI changes or to create a local version of a `ui-bundle.zip`, you need to install the following software on your computer.

- [git][link-git] (command: `git`)
- [Node][link-node] (command: `node`)
- [Gulp CLI][link-gulp-cli] (command: `gulp`)
- [Yarn][link-yarn] (command: `yarn`)

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
       v18.18.2   (Latest LTS: Hydrogen)
       v20.10.0   (Latest LTS: Iron)
```

Then install a suitable LTS version. You can install as many versions as you like or need, see example below.

```consle
nvm install 16.13.2
```

List the installed versions

```consle
nvm ls
       v10.23.0
       v12.18.2
       v14.18.3
        v15.5.1
->     v16.13.2
         system
default -> 16.13.2 (-> v16.13.2)
...
```

**Important:** For docs, DO NOT use a version _above_ v10.23.0 and _below_ v14.17.0 as it may later conflict with other dependencies especially with the `yarn preview` command where you will get warnings and it may not work as expected.

**Info:** The backend to push to the web also uses node v16, see the `.drone.star` file. It is recommended to stay with the same release if possible.

Switch to a specific installed version of Node at any time, use the following command:

```consle
nvm use 16.13.2
```

**Important:** If you have additional concurrent terminals open, you must close these terminals first and reopen them to use the new setup.

To make a particular Node version default in new terminals, type:

```consle
nvm alias default 16.13.2
```

Now that you have Node installed, you can proceed with installing the Gulp CLI and Yarn.

### Yarn

Your system must have installed `yarn`. If this is not the case,
[install yarn](https://yarnpkg.com/lang/en/docs/install) following the installation
notes on the referenced site.

### Install Dependencies

Finally, run the following command to install all dependencies:

```Shell
yarn install
```

### Add Packages

If a new package needs to be added, type the following:

```Shell
yarn add <package-name>
```

## Prepared Yarn Commands

To see all prepared yarn commands, run the following command `yarn run`. This will ouptput all commands with their settings, though this makes readability not easy. See the [yarn documentation](https://yarnpkg.com/lang/en/docs/cli/run/) for more information.

Here is the list of commands and when to use them:

* `yarn bundle`  
Generate a new `ui-bundle.zip` file for local use
* `yarn lint`  
Lint the UI bundle definition
* `yarn preview`  
Preview the bundle using the gulp. This previews a demo Antora build.

## Preview

### Preview Changes Using the ownCloud Documentation

If you want to preview your changes to the UI using the ownCloud documentation instead of demo content then you need to build a local copy of `ui-bundle.zip` and use it when generating the ownCloud documentation in your local development machine.

* First create a local `ui-bundle.zip` with the command described above.
* Then change into the respective documentation repository and run `yarn antora-dev-bundle`.  
See the [Generating the Documentation](https://github.com/owncloud/docs#generating-the-documentation) description for more details.

### Previewing Changes using a Demo Antora Build

The following example runs a demo Antora **build** (_not ownCloud_) for the documentation site which can be **accessed** on your local development machine at `http://localhost:5252`.

To view your changes as you are working on them, run the following command:

```console
yarn preview
```

### Preview Using the Seach Bar

Please note that previewing does not render the search bar. If you want to render and preview the result containing the search bar, run the following command using either `yarn preview` or `yarn serve` when running from a docs repo:

```console
ELASTICSEARCH_NODE=https://search.owncloud.com \
ELASTICSEARCH_READ_AUTH=docs:cADL6DDAKEBrkFMrvfxXEtYm \
ELASTICSEARCH_INDEX=docs \
yarn preview
```
