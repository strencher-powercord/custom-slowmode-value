import {defineConfig} from "rollup";
import swc from "rollup-plugin-swc";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
    input: "./src/index.tsx",
    external: [
        "powercord",
        "powercord/injector",
        "powercord/entities",
        "powercord/util",
        "powercord/webpack"
    ],
    output: {
        format: "commonjs",
        file: "dist/index.js",
    },
    plugins: [
        nodeResolve({
            extensions: [".ts", ".tsx"]
        }),
        swc({
            jsc: {
                parser: {
                    syntax: "typescript",
                    tsx: true
                },
                target: "es2022",
                transform: {
                    react: {
                        useBuiltins: true
                    }
                }
            }
        })
    ]
});