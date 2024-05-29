const {resolve} = require('path');
const { static } = require('express');
const public = resolve(__dirname, "../../public");

module.exports = static(public);