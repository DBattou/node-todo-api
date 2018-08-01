module.exports = {
  "extends": "airbnb",
  rules: {
    "no-underscore-dangle": "off",
    "comma-dangle": "off",
    "prefer-destructuring": "off",
    "no-useless-return": "error",
    "consistent-return": "off",
    "arrow-body-style": "off",
    "no-magic-numbers": ["error",
      {
        "ignoreArrayIndexes": true,
        "ignore": [1, 2]
      }
    ]
  }
};