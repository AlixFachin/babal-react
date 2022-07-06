module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "rules": {
        "no-unused-vars" : "error",
        "no-undef" : "error",
        "semi" : ["error", "always"],
        "comma-dangle" : ["error", "always-multiline"],
        "indent": ["error"],
    },
};
