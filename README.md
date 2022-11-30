# eslint-plugin-chinese-check

检查变量是否包含简体/繁体, 可自动修复


## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-chinese-check`:

```sh
npm install eslint-plugin-chinese-check --save-dev
```

## Usage

Add `chinese-check` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "chinese-check"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "chinese-check/chinese-check": 1
    }
}
```

or

```json
{
    "rules": {
        "chinese-check/chinese-check": [1, "T"]
    }
}
```

## 部分多音字需自行处理

```js
/* eslint-disable-next-line chinese-check/chinese-check */
const a = "简体字"
```
