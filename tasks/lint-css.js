"use strict";

const gulp = require("gulp");
const stylelint = require("@ronilaukkarinen/gulp-stylelint");

module.exports = (files) =>
  gulp.src(files).pipe(
    stylelint({
      reporters: [{ formatter: "string", console: true }],
    })
  );
