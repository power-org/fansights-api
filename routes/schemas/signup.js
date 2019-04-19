const { REGEX_TYPE } = require("../../helper/SchemaChecker");

module.exports = {
  SIGNUP: {
    name: {
      type: "string",
      min: 1,
      required: true,
      allownull: false
    },
    email: {
      type: "string",
      regex: REGEX_TYPE.IS_EMAIL,
      required: true,
      allownull: false
    },
    password: {
      type: "string",
      allownull: false,
      required: true
    }
  }
};
