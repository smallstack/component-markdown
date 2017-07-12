import html from "rollup-plugin-html";
import resolve from "rollup-plugin-node-resolve";

export default {
    format: "umd",
    sourceMap: true,
    entry: "./dist/index.js",
    dest: "./dist/bundle/index.umd.js",
    moduleName: "@smallstack/components-markdown",
    globals: {
        "@angular/core": "ng.core",
        "@smallstack/core-common": "@smallstack/core-common",
        "@smallstack/core-client": "@smallstack/core-client",
        "@smallstack/nativescript": "@smallstack/nativescript",
        "marked": "marked"
    },
    plugins: [
        html({
            include: "**/*.html",
            htmlMinifierOptions: {
                caseSensitive: true,
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        resolve()
    ],
    external: [
        "@angular/core",
        "underscore",
        "marked",
        "@smallstack/core-common",
        "@smallstack/core-client",
        "@smallstack/nativescript"
    ],
    onwarn: function (message) {
        if (/at the top level of an ES module, and has been rewritten/.test(message)) {
            return;
        }
        console.warn(message);
    }
};