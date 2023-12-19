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
[scss/manon/manon-components.scss](scss/manon/manon-components.scss) for an example of how to import
components from Manon.

After importing your chosen components from Manon, apply the theme by `@use`ing this package:

```scss
@use "@minvws/nl-rdo-rijksoverheid-ui-theme";
```

It's also possible to use `@import`, but it's recommended to use `@use` instead.

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
`manon/manon-components.scss` from the theme:

```sh
cp node_modules/@minvws/nl-rdo-rijksoverheid-ui-theme/manon/manon-components scss/_manon-components.scss
```

...and import it in your `main.scss`:

```diff
/* scss/main.scss */

+@use "manon-components";

@use "@minvws/nl-rdo-rijksoverheid-ui-theme" with (
  $font-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/fonts",
  $img-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/img"
);
```
