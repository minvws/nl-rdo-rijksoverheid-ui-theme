# Rijksoverheid Theme

Theme package for Rijksoverheid styled websites and web applications based on the [Manon framework](https://github.com/minvws/nl-rdo-manon).

## Legal

To use the theme, logo and fonts you need permissions from the Government Information Service(RVD). See also https://www.rijkshuisstijl.nl/over-de-rijkshuisstijl/auteursrecht-rijkshuisstijl.

## Documentation

The documentation and the styling examples for this package can be found on: https://minvws.github.io/nl-rdo-rijksoverheid-ui-theme/

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

Install the latest version of the package with the following command:

```shell
npm install @minvws/nl-rdo-rijksoverheid-ui-theme
```

## Usage

You can import the components you need or you can import the main file which includes all the components.
For importing the main file you can use the following stylesheet.

```scss
@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
```

Sometimes you need to set the font and image paths. You can do this by setting the `$ro-font-path` and `$ro-img-path` variables before importing the package.
When you copy the fonts and img folder to your project you need to set the paths to the correct location. When using a file loader with webpack, mix or vite you can use the `~` to tell the file loader to look in the node_modules folder.

```scss
$ro-font-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/fonts";
$ro-img-path: "~@minvws/nl-rdo-rijksoverheid-ui-theme/img";

@import "@minvws/nl-rdo-rijksoverheid-ui-theme/scss/main";
```
