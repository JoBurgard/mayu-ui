# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

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
