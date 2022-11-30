# eslint-plugin-chinese-check

chinese-check

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
        "chinese-check/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


