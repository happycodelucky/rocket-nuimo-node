"use strict";

const del         = require('del');
const gulp        = require("gulp");
const gulpTslint  = require("gulp-tslint");
const runSequence = require("run-sequence");
const sourcemaps  = require("gulp-sourcemaps");
const tsc         = require("gulp-typescript");
const tslint      = require("tslint");
const typescript  = require('typescript');

// Sources
const SRC_GLOB = 'src/**/**.ts';
const EXAMPLES_GLOB = 'examples/**/**.ts';
const TEST_GLOB = 'test/**/**.ts';

//
// Clean
//

gulp.task("clean", function() {
    return del([
        "dev",      // Development
        "dts",      // Defintion files
        "lib",      // Javascript sources
        "build",    // Build artificats
        "coverage"  // Coverage reports
    ]);
});

//
// Lint
//

gulp.task("lint", function() {
    const program = tslint.Linter.createProgram("./tsconfig.json");

    return gulp.src([
            SRC_GLOB,
            EXAMPLES_GLOB,
            TEST_GLOB,
        ])
        .pipe(gulpTslint({
            formatter: "stylish",
            program,
        }))
        .pipe(gulpTslint.report());
});

//
// Build: Universal Module Definition (ES Module, CommonJS, AMD)
//

gulp.task("build-lib", function() {
    const project = tsc.createProject("tsconfig.json", {
        module : "umd",
        target: 'es2017',
        typescript: require("typescript")
    });

    return gulp.src([
            SRC_GLOB
        ])
        .pipe(project())
        .on("error", function (err) {
            //process.exit(1);
        })
        .js.pipe(gulp.dest("lib"));
});

//
// Build: Typescript DTS declaration file generation
//

gulp.task("build-dts", function() {
    const project = tsc.createProject("tsconfig.json", {
        declaration: true,
        noResolve: false,
        typescript: require("typescript")
    });

    return gulp.src([
            SRC_GLOB
        ])
        .pipe(project())
        .on("error", function (err) {
            process.exit(1);
        })
        .dts.pipe(gulp.dest("dts"));
});

//
// Build: All
//

gulp.task("build", (done) => {
    runSequence(
        // "lint",
        [
            "build-lib",
            "build-dts"
        ],
        // "build-test",
        done
    );
});

//
// Install: All
//

gulp.task("install", (done) => {
    runSequence(
        "clean",
        [
            "build-lib",
            "build-dts"
        ],
        done
    );
});

//
// Test: TODO
//

//
// Default
//

gulp.task("default", (done) => {
    runSequence(
        "clean",
        "build",
        //"test",
        done,
    );
});