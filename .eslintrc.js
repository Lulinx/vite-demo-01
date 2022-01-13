//代码块不检测方式
/* eslint-disable */ /* eslint-enable */
module.exports = {
  root: true,

  parserOptions: {
    parser: "babel-eslint",
  },

  env: {
    browser: true,
    node: true,
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],
  plugins: ["vue"],

  rules: {
    "vue/require-v-for-key": "off", //v-for循环必须有key
    "no-const-assign": 2, //const 变量禁止修改
    "no-delete-var": 2, //不能对var声明变量使用delete操作符
    "no-var": "off", //禁止使用var,用let和const替换
    "consistent-this": [2, "_this"], //this别名
    "constructor-super": 0, //非派生类不能调用super，派生类必须调用super
    "max-nested-callbacks": [0, 2], //回调嵌套深度
    "no-unreachable": 2, //不能有无法执行的代码
    "no-trailing-spaces": 1, //一行结束后面不要有空格
    "no-spaced-func": 2, //函数调用时，函数名与（）之间不能有空格
    "no-undef": 2, //不能有未定义的变量 - 打开
    "no-alert": 1, // 不允许使用alert，confirm，prompt语句
    "no-div-regex": 2, // 不能使用看起来像除法的正则表达式
    "no-eval": 2, // 不允许使用eval()
    "no-lone-blocks": 2, // 不允许不必要的嵌套代码块
    "no-multi-spaces": 2, //禁用 a herf script 使用
    "no-script-url": 2,
    "no-unused-vars": [
      2,
      {
        vars: "all",
        args: "none",
      },
    ], //不能有声明后未被使用的变量或参数 0关 1警告 2声明不使用就爆红
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ], //html使用单闭合标签 -打开（配置：在html中never从不开启）
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: false,
      },
    ],
  },

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
