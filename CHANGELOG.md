# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.5.5](https://github.com/joburgard/mayu-ui/compare/v0.5.4...v0.5.5) (2024-01-23)


### Features

* ability to theme the button text color ([31c9b6e](https://github.com/joburgard/mayu-ui/commit/31c9b6ed3aa64ffe6ba1948ecae4281fb4811a24))

## [0.5.4](https://github.com/joburgard/mayu-ui/compare/v0.5.3...v0.5.4) (2024-01-23)


### Features

* change button roundedness based on size ([38e9d18](https://github.com/joburgard/mayu-ui/commit/38e9d189f580a2a0e20067c4a4f9f003a49171f8))

## [0.5.3](https://github.com/joburgard/mayu-ui/compare/v0.5.2...v0.5.3) (2024-01-23)


### Features

* **Button:** use css vars for primary and secondary color ([cd80732](https://github.com/joburgard/mayu-ui/commit/cd8073282e6c2c478fb57be00d6640e23a4b8d09))

## [0.5.2](https://github.com/joburgard/mayu-ui/compare/v0.5.1...v0.5.2) (2024-01-23)


### Features

* **Button:** size xs + hover color ([ea3cc22](https://github.com/joburgard/mayu-ui/commit/ea3cc22ea4713a8a9619c00d6bcb8dfdb150de02))

## [0.5.1](https://github.com/joburgard/mayu-ui/compare/v0.5.0...v0.5.1) (2024-01-19)

## [0.5.0](https://github.com/joburgard/mayu-ui/compare/v0.4.4...v0.5.0) (2024-01-14)


### ⚠ BREAKING CHANGES

* **Combobox:** renamed toOption to dataToOption

### Features

* **Combobox:** renamed toOption to dataToOption and introduced optionToDisplayText ([36bdca3](https://github.com/joburgard/mayu-ui/commit/36bdca30bc4b112c94857acc21301931dd80f6a5))

## [0.4.4](https://github.com/joburgard/mayu-ui/compare/v0.4.3...v0.4.4) (2024-01-14)


### Bug Fixes

* **Combobox:** attempt to fix types and behaviour with arbitrary values ([b6415bc](https://github.com/joburgard/mayu-ui/commit/b6415bc92089a761e81da3f0d97fd5243da641f5))

## [0.4.3](https://github.com/joburgard/mayu-ui/compare/v0.4.2...v0.4.3) (2024-01-13)


### Bug Fixes

* **Combobox:** handle setting value to empty string from outside ([8a83713](https://github.com/joburgard/mayu-ui/commit/8a837132c23f36c8b5b04cd9df9b66d1dfa863cc))

## [0.4.2](https://github.com/joburgard/mayu-ui/compare/v0.4.1...v0.4.2) (2024-01-13)


### Bug Fixes

* **Combobox:** setting the value to undefined from outside now clears the input ([7c84d96](https://github.com/joburgard/mayu-ui/commit/7c84d96dff29689c7cc336ac98d2c9ce0c1a5943))

## [0.4.1](https://github.com/joburgard/mayu-ui/compare/v0.4.0...v0.4.1) (2024-01-13)


### Bug Fixes

* **Combobox:** dispatch select event when input is cleared ([1e6bb37](https://github.com/joburgard/mayu-ui/commit/1e6bb37bf409cf9325e8d6859c1b3590475573aa))

## [0.4.0](https://github.com/joburgard/mayu-ui/compare/v0.3.2...v0.4.0) (2024-01-13)


### ⚠ BREAKING CHANGES

* **Combobox:** onSelect now returns value and the option (processed by toOption)

### Features

* **Combobox:** onSelect now returns value and the option (processed by toOption) ([2fdf37c](https://github.com/joburgard/mayu-ui/commit/2fdf37c0292474fa039cebcf11840a0272bed307))

## [0.3.2](https://github.com/joburgard/mayu-ui/compare/v0.3.1...v0.3.2) (2024-01-11)


### Features

* **Combobox:** Dispatch select event ([9b4765b](https://github.com/joburgard/mayu-ui/commit/9b4765b0a7fa9e806311dcad0c0c0e2bfde61f46))

## [0.3.1](https://github.com/joburgard/mayu-ui/compare/v0.2.1...v0.3.1) (2024-01-10)


### Features

* ability to clear value & remove preprocess prop ([4f9ea47](https://github.com/joburgard/mayu-ui/commit/4f9ea470c12559c9c33d80cccc2aa5e4c8e19479))
* **combobox:** add arbitraryValue prop to allow any value in the inputfield ([eb3b15e](https://github.com/joburgard/mayu-ui/commit/eb3b15e74f7d105f736f1b6c79745e7ae14641d8))
* **combobox:** detect value changes from the outside and try to match option ([5a86494](https://github.com/joburgard/mayu-ui/commit/5a86494e0106b604d3237b42f83001ab128741bb))
