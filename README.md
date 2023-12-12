# Rijksoverheid Theme

Theme package for Rijksoverheid styled websites and web applications using [Manon](https://github.com/minvws/nl-rdo-manon).

## Legal

To use the theme, logo and fonts you need permissions from the Government Information Service(RVD). See also https://www.rijkshuisstijl.nl/over-de-rijkshuisstijl/auteursrecht-rijkshuisstijl.

## Documentation

The documentation and the styling examples for this package can be found at https://minvws.github.io/nl-rdo-rijksoverheid-ui-theme/

## Dependencies

To use this package you need to use something like [Sass](https://sass-lang.com/), [webpack](https://webpack.js.org/), [Laravel Mix](https://laravel-mix.com/) or [Vite](https://vitejs.dev/).

You can find an example webpack configuration file in the html folder of this package.

## Installation

Simple steps for using this package in your project.
You can read detailed instructions on how to use GitHub npm packages on https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry.

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

To authenticate for GitHub packages you need to add a personal access token (classic) to your user `.npmrc` file.
The personal access token needs to have the scope `read:packages`.

You can find more information on how to create a personal access token on https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token.

Create a new ~/.npmrc file if one doesn't exist.
Add the following line to the file, replacing TOKEN with your personal access token.

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
1. Import everything all at once.
2. Pick Manon components and then apply the theme.
2. Pick Manon components and parts of the theme (not recommended).

### Import everything all at once

For importing everything, including Manon itself, you can `@import` the `main.scss` file in your
SCSS:

```scss
@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
```

### Pick Manon components and then apply the theme

Follow the instructions in the Manon docs or have a look at [scss/manon/](scss/manon/) to see how to
import components from Manon.

After importing your chosen components from Manon, apply the theme by `@import`ing this package:

```scss
@import "@minvws/nl-rdo-rijksoverheid-ui-theme";
```

## Font and image paths

By default, fonts and images are loaded from `url()`s starting with
`@minvws/nl-rdo-rijksoverheid-ui-theme`. That means that, if you are using Vite or another bundler
like Vite that understands how to load files from `node_modules`, this should work out-of-the-box.

If you are using the `sass` CLI directly, you can use the [`--load-path`](https://sass-lang.com/documentation/cli/dart-sass/#load-path) option to tell it to look in `node_modules` as well:

```shell
sass  --load-path=node_modules  scss/app.scss  css/app.css
```

In some cases you may need to change the font and image paths. For example, webpack supports loading
from `node_modules` if the package name is prefixed with `~`. Or perhaps your project copies the
files to a known location or a CDN. You can do this by setting the SCSS variables `$manon-font-path`
and `$manon-img-path` before importing the package. For example, for webpack:

```scss
$ro-font-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/fonts";
$ro-img-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/img";

@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
```
