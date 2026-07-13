# ownCloud Documentation UI

<!-- OSPO-managed README | Generated: 2026-04-16 | v2 -->

[![License](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE) [![ownCloud OSPO](https://img.shields.io/badge/OSPO-ownCloud-blue)](https://kiteworks.com/opensource)

A custom Antora UI theme for the official ownCloud documentation. This repository is based on the [Antora Default UI](https://gitlab.com/antora/antora-ui-default) and provides the HTML templates, CSS styles, JavaScript behavior, and assets that define the look and feel of the published documentation at [doc.owncloud.com](https://doc.owncloud.com).

## Getting Started

Install dependencies and preview the UI:

```bash
npm install
npm run preview
```

To build the UI bundle for production:

```bash
npm run bundle
```

The generated `ui-bundle.zip` in `build/` is consumed by the Antora documentation build.

## Documentation

- [Main Documentation Build](https://github.com/owncloud/docs)
- [Antora UI Documentation](https://docs.antora.org/antora-ui-default/)

## Part of ownCloud Documentation

This repository provides the UI bundle consumed by the [ownCloud docs](https://github.com/owncloud/docs) Antora build. The output `ui-bundle.zip` is referenced in the docs site playbook. Published documentation is available at [doc.owncloud.com](https://doc.owncloud.com).

## Development Reference

Development workflow and build tooling for the UI bundle:

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v22 LTS recommended; use [NVM](https://github.com/creationix/nvm) to manage versions)
- npm >= 11.11.0

### Available npm Commands

| Command | Description |
|---|---|
| `npm run lint` | Lint the UI bundle definition |
| `npm run bundle` | Generate a `ui-bundle.zip` for local use |
| `npm run preview` | Preview the bundle using a demo Antora build at `http://localhost:5252` |

### Preview with ownCloud Documentation

To preview UI changes using the actual ownCloud documentation instead of demo content:

1. Build a local `ui-bundle.zip` with `npm run bundle`
2. Switch to the target documentation repository
3. Run `npm run antora-dev-bundle` in the docs repo

See the [Generating the Documentation](https://github.com/owncloud/docs#generating-the-documentation) guide for details.

### Contributing Workflow

Create a feature branch off `master`, make changes, and submit a PR. When merged, the CI pipeline automatically builds and publishes a new `ui-bundle.zip` to `https://minio.owncloud.com/documentation/ui-bundle.zip`.

## Community & Support

**[Star](https://github.com/owncloud/docs-ui)** this repo and **Watch** for release notifications!

- [ownCloud Website](https://owncloud.com)
- [Community Discussions](https://github.com/orgs/owncloud/discussions)
- [Matrix Chat](https://app.element.io/#/room/#owncloud:matrix.org)
- [Documentation](https://doc.owncloud.com)
- [Enterprise Support](https://owncloud.com/contact-us/)
- [OSPO Home](https://kiteworks.com/opensource)

## Contributing

We welcome contributions! Please read the [Contributing Guidelines](CONTRIBUTING.md)
and our [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

### Workflow

- **Rebase Early, Rebase Often!** We use a rebase workflow. Always rebase on the target branch before submitting a PR.
- **Dependabot**: Automated dependency updates are managed via Dependabot. Review and merge dependency PRs promptly.
- **Signed Commits**: All commits **must** be PGP/GPG signed. See [GitHub's signing guide](https://docs.github.com/en/authentication/managing-commit-signature-verification).
- **DCO Sign-off**: Every commit must carry a `Signed-off-by` line:
  ```
  git commit -s -S -m "your commit message"
  ```
- **GitHub Actions Policy**: Workflows may only use actions that are (a) owned by `owncloud`, (b) created by GitHub (`actions/*`), or (c) verified in the GitHub Marketplace.

## Security

**Do not open a public GitHub issue for security vulnerabilities.**

Report vulnerabilities at **<https://security.owncloud.com>** -- see [SECURITY.md](SECURITY.md).

Bug bounty: [YesWeHack ownCloud Program](https://yeswehack.com/programs/owncloud-bug-bounty-program)

## License

This project is licensed under the [AGPL-3.0](LICENSE).

## About the ownCloud OSPO

The [Kiteworks Open Source Program Office](https://kiteworks.com/opensource), operating under
the [ownCloud](https://owncloud.com) brand, launched on May 5, 2026, to steward the open source
ecosystem around ownCloud's products. The OSPO ensures transparent governance, license compliance,
community health, and sustainable collaboration between the open source community and
[Kiteworks](https://www.kiteworks.com), which acquired ownCloud in 2023.

- **OSPO Home**: <https://kiteworks.com/opensource>
- **GitHub**: <https://github.com/owncloud>
- **ownCloud**: <https://owncloud.com>

For questions about the OSPO or licensing, contact ospo@kiteworks.com.

### License Migration to Apache 2.0

The OSPO is driving a strategic relicensing of ownCloud repositories toward the
[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), following
the [Apache Software Foundation's third-party license policy](https://www.apache.org/legal/resolved.html).

Individual repositories will migrate as their audit is completed. The LICENSE file
in each repo reflects its **current** license status (not the target).

**Current license: AGPL-3.0** (Category X per Apache policy -- cannot be included in Apache-2.0 works).

Migration prerequisites for this repository:

- **CLA/DCO coverage**: All past contributors must have signed agreements permitting relicensing
- **Copyleft dependency audit**: All AGPL/GPL dependencies must be replaced or isolated
- **KDE heritage review**: Any code with KDE-era copyrights requires legal analysis
- **Complete relicensing**: AGPL-3.0 is a strong copyleft license; migration requires full relicensing of all files, not just a header change
