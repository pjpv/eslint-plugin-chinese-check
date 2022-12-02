# eslint-plugin-chinese-check

检查变量字符串中是否包含未转换的简体中文(或繁体), 可自动修复；
检查变量中是否存在中文字符串；


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

## 1.chinese-check

Then configure the rules you want to use under the rules section.

```javascript
{
    "rules": {
        "chinese-check/chinese-check": 1 // [1, "S"]
    }
}

// 正確
const a = '簡體字轉繁體字'
// 錯誤
const a = '简体字转繁体字'
```

or

```javascript
{
    "rules": {
        "chinese-check/chinese-check": [1, "T"]
    }
}

// 正確
const a = '繁体字转简体字'
// 錯誤
const a = '繁體字轉簡體字'
```

> 一简对多繁等问题需自行处理

可使用一下方法忽略某一行
```js
/* eslint-disable-next-line chinese-check/chinese-check */
const a = "简体字"
```


## 2.contains

```.eslintrc.js```

```javascript
{
    overrides: [
        {
            files: [
                'src/locales/lang/en-US/**/*',
            ],
            rules: {
                'chinese-check/chinese-check': 1
            }
        }
    ]
}
```