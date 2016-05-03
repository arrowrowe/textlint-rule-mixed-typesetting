'use strict';

const match = (text, pattern, fn) => {
  let ret;
  while (ret = pattern.exec(text)) {
    fn(ret);
  }
};

const inList = list => text => list.includes(text);
const exempt = {
  engRight: inList([
    ' ', '\n', '\r',
    ')', ']', "'", '"',
    ':',
    ',', '.', '!'
  ]),
  engLeft: inList([
    ' ', '\n', '\r',
    '(', '[', "'", '"'
  ]),
  nonengRight: inList([
    '）', '】', '”', '’', '」',
    '：',
    '，', '。', '！',
    '、'
  ]),
  nonengLeft: inList([
    '（', '【', '“', '‘', '「',
    '：',
    '、'
  ])
};

function reporter(context, option) {
  const exports = {};
  exports[context.Syntax.Document] = node => {
    const report = (message, index, length, replaceWith) => {
      const detail = {index};
      if (replaceWith) {
        detail.fix = context.fixer.replaceTextRange(
          [index, index + length],
          replaceWith
        );
      }
      context.report(node, new context.RuleError(message, detail));
    };
    const text = context.getSource(node);
    const check = (pattern, shouldExempt) => match(
      text, pattern, ret => shouldExempt(ret) || report(`Missing space between ${ret[1]} and ${ret[2]}.`, ret.index + 1, 0, ' ')
    );
    check(/([^\x00-\xff])([\x00-\xff])/ig, ret =>
      exempt.engRight(ret[2]) ||
      exempt.nonengLeft(ret[1]) ||
      exempt.nonengRight(ret[1]) && exempt.engLeft(ret[2])
    );
    check(/([\x00-\xff])([^\x00-\xff])/ig, ret =>
      exempt.engLeft(ret[1]) ||
      exempt.nonengRight(ret[2]) ||
      exempt.engRight(ret[1]) && exempt.nonengLeft(ret[2])
    );
  };
  return exports;
}

module.exports = {
  linter: reporter,
  fixer: reporter
};
