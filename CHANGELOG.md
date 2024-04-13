# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.7.7](https://github.com/joburgard/mayu-ui/compare/v0.7.6...v0.7.7) (2024-04-13)


### Features

* **Combobox:** change selection behaviour. clicking into input won't close popover ([cae88b3](https://github.com/joburgard/mayu-ui/commit/cae88b3cb31e3ca59a9fb29ba9dc781f658bbb0d))

## [0.7.6](https://github.com/joburgard/mayu-ui/compare/v0.7.5...v0.7.6) (2024-04-12)


### Features

* Input + Combobox unstyled variant ([0290a7a](https://github.com/joburgard/mayu-ui/commit/0290a7a0fd948e16fccc450b261611cc5f1e0d6f))

## [0.7.5](https://github.com/joburgard/mayu-ui/compare/v0.7.4...v0.7.5) (2024-04-11)


### Features

* **Combobox:** isLoading + minSameWidth ([c29099c](https://github.com/joburgard/mayu-ui/commit/c29099cb15206f5e11dd4b83736dd175a4d7a758))


### Bug Fixes

* pointer-events-none for input placeholder / label ([96b6103](https://github.com/joburgard/mayu-ui/commit/96b6103b867234a957fc853bd22424a22582541d))

## [0.7.4](https://github.com/joburgard/mayu-ui/compare/v0.7.3...v0.7.4) (2024-03-21)


### Bug Fixes

* **combobox:** regenerate showAllResult when data changes ([efc4e3e](https://github.com/joburgard/mayu-ui/commit/efc4e3ebdc65c84054b57f7ee49b3acaa11992a5))

## [0.7.3](https://github.com/joburgard/mayu-ui/compare/v0.7.2...v0.7.3) (2024-03-21)


### Features

* regenerate haystack when data changes ([8d42628](https://github.com/joburgard/mayu-ui/commit/8d426283d6f95646769706179e7aea7b62c8a84b))

## [0.7.2](https://github.com/joburgard/mayu-ui/compare/v0.7.1...v0.7.2) (2024-03-03)


### Bug Fixes

* **Combobox:** fix SSR problems ([99a63f6](https://github.com/joburgard/mayu-ui/commit/99a63f6e37ef20d75df202fc26a2136481782931))

## [0.7.1](https://github.com/joburgard/mayu-ui/compare/v0.7.0...v0.7.1) (2024-03-02)


### Bug Fixes

* **Pagination:** trigger onpagechange only on user input ([43a3675](https://github.com/joburgard/mayu-ui/commit/43a3675b12bd3f95d43b6859f01080748a495c74))

## [0.7.0](https://github.com/joburgard/mayu-ui/compare/v0.6.5...v0.7.0) (2024-03-01)


### ⚠ BREAKING CHANGES

* **Button:** new variant + new default variant + changed styles

### Features

* added pagination component ([bbe16f1](https://github.com/joburgard/mayu-ui/commit/bbe16f1f9418d6c2246dfe585bf67c2e38be0553))
* **Button:** new variant + new default variant + changed styles ([5ef478f](https://github.com/joburgard/mayu-ui/commit/5ef478fea332cb3f7c7b895969d913901d158593))

## [0.6.5](https://github.com/joburgard/mayu-ui/compare/v0.6.4...v0.6.5) (2024-02-26)


### Bug Fixes

* pass trigger prop as a store to keep it reactive ([ae34ba3](https://github.com/joburgard/mayu-ui/commit/ae34ba3cf71919f82ea1d7fbd0282b008c204f50))

## [0.6.4](https://github.com/joburgard/mayu-ui/compare/v0.6.3...v0.6.4) (2024-02-25)


### Bug Fixes

* **ContextMenu:** add component to exports ([4811b34](https://github.com/joburgard/mayu-ui/commit/4811b3483c8d4a5b58be5817c77f1727156f7b95))

## [0.6.3](https://github.com/joburgard/mayu-ui/compare/v0.6.2...v0.6.3) (2024-02-25)


### Features

* **ContextMenu:** allow external trigger via component prop ([d9b106f](https://github.com/joburgard/mayu-ui/commit/d9b106f1bde47d1e84703df987786059d06b4fdb))

## [0.6.2](https://github.com/joburgard/mayu-ui/compare/v0.6.1...v0.6.2) (2024-02-25)


### Features

* added ContextMenu component ([21aa531](https://github.com/joburgard/mayu-ui/commit/21aa531d9b885260b84d151f36698dc573b11dc8))

## [0.6.1](https://github.com/joburgard/mayu-ui/compare/v0.6.0...v0.6.1) (2024-02-23)


### Features

* **Combobox:** use tooltip styles for popover element ([c884fd3](https://github.com/joburgard/mayu-ui/commit/c884fd3a0e3fa2bc2f98404685e38b8e9b5d8403))
* **Tooltip:** add size variants ([6d4e7d4](https://github.com/joburgard/mayu-ui/commit/6d4e7d4f94b60ae7d4aeffe4dc1f11f016b4c4f2))


### Bug Fixes

* **Combobox:** solve some edge cases ([56efd3a](https://github.com/joburgard/mayu-ui/commit/56efd3abd930576db6ae0bff2c1de4425a7cfb2a))

## [0.6.0](https://github.com/joburgard/mayu-ui/compare/v0.5.8...v0.6.0) (2024-02-17)


### ⚠ BREAKING CHANGES

* several wrong behaviours in edge cases

### Bug Fixes

* <a> tags now render correctly ([3625b44](https://github.com/joburgard/mayu-ui/commit/3625b44aa5dda5be16af3a8a9a51ef8f7b977b37))
* several wrong behaviours in edge cases ([903c2fa](https://github.com/joburgard/mayu-ui/commit/903c2fa02b2f89066445e5729cdfec38d68688e0))

## [0.5.8](https://github.com/joburgard/mayu-ui/compare/v0.5.7...v0.5.8) (2024-01-31)


### Features

* **Tooltip:** add disabled prop ([69f912b](https://github.com/joburgard/mayu-ui/commit/69f912bd814d3267b4066dad819fcb19ac66db00))

## [0.5.7](https://github.com/joburgard/mayu-ui/compare/v0.5.6...v0.5.7) (2024-01-31)


### Bug Fixes

* export tooltip ([0c67924](https://github.com/joburgard/mayu-ui/commit/0c6792452888c4d3388e142c5299f9cbd69fd5bf))

## [0.5.6](https://github.com/joburgard/mayu-ui/compare/v0.5.5...v0.5.6) (2024-01-31)


### Features

* **Components:** add Tooltip component ([3cf52e4](https://github.com/joburgard/mayu-ui/commit/3cf52e48356bf0b68e3a22b6ed5c93f140fc997b))

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
