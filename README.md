# textlint-rule-mixed-typesetting

[![textlint rule][textlint-badge]][Textlint]

[textlint-badge]: https://img.shields.io/badge/textlint-fixable-green.svg?style=social

[Textlint]: https://textlint.github.io/
[Textlint-readme]: https://github.com/textlint/textlint#readme

> A Textlint's rule for mixed typesetting.

This repo is still under construction.
Any help is welcome!

## Usage

See also [Textlint's readme][Textlint-readme].

__TL;DR__

`.textlintrc`
```javascript
{
  "rules": {
    "mixed-typesetting": true
  }
}
```

`package.json`
```javascript
{
  // ...
  "scripts": {
    "textlint": "textlint",
    "textlint:fix": "textlint --fix"
  }
  // ...
}
```

Command line:
```
# NOTE: this is currently not available, as TRMT is not yet published on NPM.
$ npm i -D textlint textlint-rule-mixed-typesetting
$ npm run textlint
$ npm run textlint:fix
```

## References

- [中文文案排版指北](https://github.com/mzlogin/chinese-copywriting-guidelines)
