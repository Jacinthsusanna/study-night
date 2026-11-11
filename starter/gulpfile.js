import gulp from "gulp";
import shell from "gulp-shell";

// Build with Parcel and serve the app at http://localhost:1234
gulp.task("parcel", shell.task("npx parcel index.html"));

// Create the optimized (minified, compressed) production bundle in dist/
gulp.task("build", shell.task("npx parcel build index.html"));

// Run the Mocha unit tests
gulp.task("test", shell.task("npx mocha"));

// Run the Cypress end-to-end tests (the Parcel server must already be running)
gulp.task("cypress", shell.task("npx cypress run"));

// Run unit tests first, then build and serve with Parcel
gulp.task("check-and-serve", gulp.series("test", "parcel"));

// Default task: build and serve the project
gulp.task("default", gulp.series("parcel"));
