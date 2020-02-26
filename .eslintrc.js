module.exports = {
  env: {
    browser: true,
    es6: true,
    "react-native/react-native": true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      "experimentalObjectRestSpread": true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    "indent":            [ "warn", 2 ],
    "linebreak-style":   [ "error", "unix" ],
    // "flowtype/semi":  [ 2, "never" ],
    // "babel/semi":     "error",
    // "flowtype/delimiter-dangle": [ 2, "always-multiline" ],
    "airbnb/no-console":                      0,
    "no-multi-spaces":                        0,
    "no-trailing-spaces":                     1,
    "quotes":                                 0,
    "global-require":                         0,
    "import/no-named-as-default":             0,
    "no-else-return":                         0,
    "no-underscore-dangle":                   0,
    "no-use-before-define":                   0,
    "object-curly-newline":                   0,
    "react-native/no-color-literals":         0,
    "react-native/no-inline-styles":          1,
    "react-native/no-unused-styles":          1,
    "react-native/split-platform-components": 1,
    "react/no-unused-prop-types":             0,
    "react/require-default-props":            0,
    "react/jsx-props-no-multi-spaces":        0,
    "react/jsx-equals-spacing":               0,
    "key-spacing":                            0,
    "react/state-in-constructor":             0,
    "jsx-a11y/accessible-emoji":              0,
    "react/prop-types": 0,
    "react/sort-comp": [1, {
      order: [
        'state',
        'static-variables',
        'instance-variables',
        'static-methods',
        'lifecycle',
        '/^(on|handle).+$/',
        'render',
        'everything-else'
      ]
    }],
    "semi": 0,
    // "react-native/no-single-element-style-arrays": 2,
    "react-native/no-raw-text": [
      "warn",
      { "skip": [ "WebLink" ] },
    ],
    "class-methods-use-this": [
      "error",
      {
        "exceptMethods": [
          "render",
          "componentWillMount",
          "componentDidMount",
          "componentWillReceiveProps",
          "shouldComponentUpdate",
          "componentWillUpdate",
          "componentDidUpdate",
          "componentWillUnmount"
        ]
      }
    ],
    "react/jsx-filename-extension": [ 1, { "extensions": [ ".js", ".jsx" ] } ],
  },
};
