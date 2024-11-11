# Rijksoverheid Theme

Theme package for Rijksoverheid styled websites and web applications using
[Manon](https://github.com/minvws/nl-rdo-manon).

## Legal

To use the theme, logo and fonts you need permissions from the Government Information Service(RVD).
See also https://www.rijkshuisstijl.nl/over-de-rijkshuisstijl/auteursrecht-rijkshuisstijl.

## Documentation

The documentation and the styling examples for this package can be found at
https://minvws.github.io/nl-rdo-rijksoverheid-ui-theme/

## Dependencies

To use this package you need to use something like [Sass](https://sass-lang.com/),
[webpack](https://webpack.js.org/), [Laravel Mix](https://laravel-mix.com/) or
[Vite](https://vitejs.dev/).

You can find an example webpack configuration file in the [`html/` folder](html/) of this package.

## Installation

This project is published as an npm package on the GitHub Packages registry. See [working with the
npm
registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

### Create .npmrc file in project

Create a `.npmrc` file in the root of your project with the following content:

```
@minvws:registry=https://npm.pkg.github.com
```

On linux you can use the following command:

```shell
echo "@minvws:registry=https://npm.pkg.github.com" >> .npmrc
```

### Add GitHub token to user .npmrc file

To authenticate for GitHub packages you need to add a personal access token (classic) to your user
`.npmrc` file with the `read:packages` scope. You can [generate a new access token
(`read:packages`)](https://github.com/settings/tokens/new?scopes=read:packages&description=GitHub+Packages+token)
or read more about [managing your personal access
tokens](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

Create a new `~/.npmrc` file if one doesn't exist. Add the following line to the file, replacing
`TOKEN` with your personal access token.

```
//npm.pkg.github.com/:_authToken=TOKEN
```

### Install package

Install the latest versions of Manon and this theme with the following command:

```shell
npm install @minvws/manon @minvws/nl-rdo-rijksoverheid-ui-theme
```

## Usage

There are three ways to use this theme:

1. As a Manon theme (recommended)
2. As Manon theme modules (not recommended)
3. Standalone

### As a Manon theme (recommended)

Follow the instructions in the Manon docs or have a look at
[`scss/manon/_index.scss`](scss/manon/_index.scss) for an example of how to import components from
Manon.

After importing your chosen components from Manon, apply the theme by `@use`ing this package:

```scss
@use "@minvws/nl-rdo-rijksoverheid-ui-theme";
@use "@minvws/nl-rdo-rijksoverheid-ui-theme/components";
```

The second line imports all of the theme-specific components. These bring their own CSS. If one or
more of these components interfere with other CSS in the application, it's possible to import only
specific components, like so:

```scss
@use "@minvws/nl-rdo-rijksoverheid-ui-theme";
@use "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/components/logo";
@use "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/components/ro-icons";
@use "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/components/radio";
@use "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/components/checkbox";
@use "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/components/input";
```

See [`scss/components/_index.scss`](scss/components/_index.scss) for a full list of the components.

Note: it's also possible to use `@import`, but it's recommended to use `@use` instead.

### As Manon theme modules (not recommended)

In addition to choosing which Manon components to load, it is also possible to selectively import
individual components from the theme. Please keep in mind that these might change between releases,
so this is not recommended.

### Standalone

You can also still use the theme as a standalone library. This will import everything, including
Manon itself. To do so, import `scss/main` into your project, e.g.:

```scss
@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
```

## Font and image paths

By default, fonts and images are loaded from `url()`s starting with
`@minvws/nl-rdo-rijksoverheid-ui-theme`. That means that, if you are using Vite or a similar bundler
that understands how to load files from `node_modules`, this should work out-of-the-box.

If you are using the `sass` CLI directly, you can use the
[`--load-path`](https://sass-lang.com/documentation/cli/dart-sass/#load-path) option to tell it to
look in `node_modules` as well:

```shell
sass  --load-path=node_modules  scss/app.scss  css/app.css
```

In some cases you may need to change the basepath. Your project might copy the assets to a known
location or CDN, or use a build like older versions of webpack that only resolve assets from
`node_modules` when the URL is prefixed with a `~`, e.g. `~@minvws/nl-rdo-rijksoverheid-ui-theme`.

In cases like this, you can configure the asset URL basepaths via SCSS variables:

### When [used as a Manon theme](#as-a-manon-theme)

Pass the `$font-path` and `$img-path` (**NB: no `ro-` prefix**) when `@use`ing the theme:

```scss
@use "@minvws/nl-rdo-rijksoverheid-ui-theme" with (
  $font-path: "./url/to/fonts",
  $img-path: "./url/to/img"
);
```

### In [Standalone mode](#standalone)

Define the `$ro-font-path` and `$ro-img-path` variables before `@import`ing `/scss/main.scss` from
the theme:

```scss
$ro-font-path: "./url/to/fonts";
$ro-img-path: "./url/to/img";
@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
```

## Migrating from Standalone to Theme

To migrate from Standalone mode to Theme mode, first make sure you're on the latest version of
`@minvws/nl-rdo-rijksoverheid-ui-theme` and add `@minvws/manon` as a dependency, if your project
doesn't have it yet.

```sh
npm install @minvws/manon@latest @minvws/nl-rdo-rijksoverheid-ui-theme@latest
```

Next, update the way you import the theme. In this example we'll assume your main scss file is
`scss/main.scss` and you're using a bundler that requires a `~` prefix for importing npm packages.

```diff
/* scss/main.scss */

-@ro-font-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/fonts";
-@ro-img-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/img";
-@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
+@use "@minvws/nl-rdo-rijksoverheid-ui-theme" with (
+  $font-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/fonts",
+  $img-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/img"
+);
```

Finally, import the components you need from `@minvws/manon`. A good place to start is to copy
[`scss/manon/_index.scss`](scss/manon/_index.scss) from the theme:

```sh
cp node_modules/@minvws/nl-rdo-rijksoverheid-ui-theme/scss/manon/_index.scss scss/_manon.scss
```

...and import it in your `main.scss`:

```diff
/* scss/main.scss */

+@use "manon";

@use "@minvws/nl-rdo-rijksoverheid-ui-theme" with (
  $font-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/fonts",
  $img-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/img"
);
```

## Development

To work on the theme itself, clone the git repo and run `npm install`.

To run a development server, run `npm run dev`. This will perform a development build of the docs
site, watch for changes, and run a local http server to serve the files.

### Visual regression tests

To run the visual regression tests, you will need docker and docker compose and you will need to
[authenticate with the GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic):

1. [Create a GitHub personal access token (classic) with scope `read:packages`](https://github.com/settings/tokens/new?scopes=read:packages&description=GitHub%20Container%20Registry%20Token).
2. Run `docker login ghcr.io --username <username>`, substituting your GitHub username.
3. In the password prompt, enter the personal access token you obtained form step 1.

Once you are authenticated, you can run the visual regression tests:

```sh
npm install
npm run visual:test
```

This will screenshot all test pages and report any visual differences from the preview reference
screenshots. Run `npm run visual:report` to view the report, and if the differences are expected,
run `npm run visual:approve` to update the reference screenshots. Ideally, commit the updated
screenshots along with the changes that cause the visual differences.

If there are any issues with the visual regression tests, you can try using `npm run
visual:reference` to generate fresh reference images from scratch.

## Publishing

### Docs site production build

The "github-pages" CI workflow publishes a production build of the docs to github pages from the
`main` branch.

To locally build the docs for production (e.g. to debug production issues), run `npm run build`.

To run a local http server to preview the build, run `npm run preview`. This will serve the files in
`html/`. NB: both the development and production builds output to `html/`, so you can only use one
at a time.

### Package for release

To publish a release, tag a commit with a version number, ideally by drafting a new release via the
[releases page](https://github.com/minvws/nl-rdo-rijksoverheid-ui-theme/releases) to add release
notes. The "github-publish" CI workflow will take care of publishing the package.

If you need to manually create a package, just running `npm pack` is enough, no build step is
necessary.

## Contributing

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the GitHub repository of this package.

## License

This repository follows the
[REUSE Specfication v3.2](https://reuse.software/spec-3.2/). The code is
available under the EUPL-1.2 license, but the fonts and images are not. Please
see [LICENSES/](./LICENSES), [REUSE.toml](./REUSE.toml) and the individual
`*.license` files (if any) for copyright and license information.

## Part of iCore

This package is part of the iCore project.
