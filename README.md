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

```
nvm ls-remote | grep "Latest LTS"

         v4.9.1   (Latest LTS: Argon)
        v6.17.1   (Latest LTS: Boron)
        v8.17.0   (Latest LTS: Carbon)
       v10.24.1   (Latest LTS: Dubnium)
       v12.22.1   (Latest LTS: Erbium)
       v14.17.0   (Latest LTS: Fermium)
```
Then install a suitable LTS version. You can install as many versions as you like or need, see example below.

```
nvm install 10.23.0
nvm install 14.17.0
```

List the installed versions

```
nvm ls
       v10.23.0
       v12.18.2
->     v14.17.0
        v15.5.1
         system
default -> 10.23.0 (-> v10.23.0)
...
```

**Info:** The backend to push to the web also uses node v14, see the `.drone.star` file. It is recommended to stay with the same release if possible.

Switch to a specific installed version of Node at any time, use the following command:

```
nvm use 14.17.0
```
**Important:** If you have additional concurrent terminals open, you must close these terminals first and reopen them to use the new setup.

To make a particular Node version default in new terminals, type:

```
nvm alias default 14.17.0
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

## Prepared Yarn Commands

To get all prepared yarn commands run the following command:

```console
yarn run

yarn run v1.22.5
info Commands available from binary scripts: JSONStream, acorn, atob, bin-version-check, browser-pack, browserify, browserslist, color-support, deps-sort, eslint, esparse, esvalidate, executable, find-versions, gifsicle, gulp, handlebars, insert-module-globals, jpegtran, js-yaml, lpad-align, miller-rabin, mime, mkdirp, module-deps, optipng, prettier, rc, rimraf, seek-bunzip, seek-table, semver, sha.js, specificity, strip-bom, strip-dirs, strip-indent, stylelint, svgo, tsc, tsserver, uglifyjs, umd, user-home, uuid, which
info Project commands
   - bundle
      gulp pack
   - lint
      gulp lint
   - preview
      gulp preview
question Which command would you like to run?:
```

Please see the [documentation](https://yarnpkg.com/lang/en/docs/cli/run/)
for more information about the the `yarn run` command.

### Preview Changes Using ownCloud Documentation

If you want to preview your changes to the UI using the ownCloud documentation instead of demo content then you need to build a local copy of `ui-bundle.zip` and use it when generating the ownCloud documentation in your local development machine.

To do this, run the following command in the root directory of your `docs-ui` clone:

```console
yarn bundle
```

When built, the UI bundle will be available in directory `build/ui-bundle.zip`
Assuming that your local copy of the docs-ui repository is at the same level as your local copy of the docs directory, then in your docs repository’s root directory, run the following command:

```console
yarn antora \
    --url http://localhost:8080 \
    --ui-bundle-url ../docs-ui/build/ui-bundle.zip
```

Follow the [instructions][link-preview] to preview the documentation with the changes made.

## Previewing Changes Locally

The following examples will runs a demo Antora **build** (_not ownCloud_) for the documentation site which can be **accessed** on your local development machine at `http://localhost:5252`.

To view your changes as you are working on them, run the following command:

```console
yarn preview
```

Please note that this command does not render the search bar.
If you want to render and preview the result containing the search bar, run the following command:

```console
ELASTICSEARCH_PROTO=https ELASTICSEARCH_HOST=search.owncloud.com \
  ELASTICSEARCH_PORT=443 ELASTICSEARCH_READ_AUTH=docs:cADL6DDAKEBrkFMrvfxXEtYm \
  ELASTICSEARCH_INDEX=docs yarn preview
```
