module.exports = {
    root: true,
    parser: 'babel-eslint',
    env: {
        browser: true,
        node: true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        'indent': [
            'error',
            4
        ],
        // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        'array-bracket-spacing': [2, 'never'],
        //该规则规定了在对象字面量语法中key和value之间的空白，冒号前不要留空格，冒号后面需留一个空格
        "key-spacing": [2, {
            "beforeColon": false,
            "afterColon": true
        }],
        "no-multiple-empty-lines": [1, {
            "max": 3
        }]
    },
    globals: {}
}
