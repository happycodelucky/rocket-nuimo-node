/**
 * rocket-nuimo gulp.js task configuration
 *
 * Tasks:
 *  - clean
 *  - lint
 *  - build
 *  - cleanArtifacts
 *  - packageArtifacts
 *  - publish
 */

import * as del from 'del'
import * as typescript from 'typescript'
import * as merge from 'merge2'

import gulpTsLint from 'gulp-tslint'

import { Linter } from 'tslint'
import { Project } from 'gulp-typescript'
import { TaskCallback } from 'gulp'

import { createProject as createTsProject } from 'gulp-typescript'
import { dest, parallel, series, src } from 'gulp'

// Build destination paths
const ARTIFACTS_DEST = 'build'  // Build artificats
const COVERAGE_DEST = 'build'   // Coverage reports
const LIB_DEST = 'lib'          // Javascript sources
const TYPEDEF_DEST = 'dts'      // Defintion files

// Package projects
const PROJECT_TSCONFIG = './src/tsconfig.json'
const EXAMPLES_TSCONFIG = './examples/tsconfig.json'

// Package files
const PACKAGE_FILES_GLOB = [
    'LICENSE',
    'package.json',
    'README.md',
]

/**
 * Purges all generated sources and artifacts
 */
export function clean() {
    return del([
        ARTIFACTS_DEST,
        COVERAGE_DEST,
        LIB_DEST,
        TYPEDEF_DEST,
    ])
}

/**
 * Performs a lint on package sources
 */
export function lint() {
    return lintSources(tsProject())
}

/**
 * Transpiles package sources
 */
export function build() {
    return transpileSources(tsProject(), './')
}

/**
 * Cleans packaged artifacts
 */
export function cleanArtifacts() {
    return del(ARTIFACTS_DEST)
}

/**
 * Packages up the package and assembles an set of artifacts for publishing
 */
export function packageArtifacts(done: TaskCallback) {
    const project = tsProject()
    const artifactsPath = ARTIFACTS_DEST

    return series(
        cleanArtifacts,
        lintSources.bind(undefined, project),
        transpileSources.bind(undefined, project, artifactsPath),
        parallel(
            copyPackageFiles.bind(undefined, artifactsPath),
            copyTypeScriptProjectSources.bind(undefined, project, `${artifactsPath}/src`),
        ),
    )(done)
}

//
// Private functions
//

/**
 * Package default project
 */
export function tsProject(): Project {
    return createTsProject(PROJECT_TSCONFIG, {
        typescript,
        declaration: true,
    })
}

/**
 * Package examples project
 */
function tsExamplesProject(): Project {
    return createTsProject(EXAMPLES_TSCONFIG, {
        typescript,
    })
}

/**
 * Lints a given project
 */
function lintSources(project: Project) {
    const program = Linter.createProgram(project.configFileName)
    program.getSourceFiles()

    return project.src()
        .pipe(gulpTsLint({
            fix: false,
            formatter: 'codeFrame',
            program,
        }))
        .pipe(gulpTsLint.report({
            summarizeFailureOutput: true,
            allowWarnings: true,
        }));
}

/**
 * Transpiles TypeScript sources
 */
function transpileSources(project: Project, artifactsPath: string) {
    const compilationResult = project.src().pipe(project())

    return merge([
        compilationResult.js.pipe(dest(`${artifactsPath}/lib`)),
        compilationResult.dts.pipe(dest(`${artifactsPath}/dts`)),
    ])
}

/**
 * Copies package TypeScript sources
 */
function copyTypeScriptProjectSources(project: Project, destPath: string) {
    return project.src().pipe(dest(destPath))
}

/**
 * Copies all other package files based on PACKAGE_FILES_GLOB
 */
function copyPackageFiles(artifactsPath: string) {
    return src(PACKAGE_FILES_GLOB).pipe(dest(artifactsPath))
}