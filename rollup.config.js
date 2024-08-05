import ts from "rollup-plugin-typescript2";
import path from "path";
import { fileURLToPath } from "url";
const metaUrl = fileURLToPath(import.meta.url);
const dirName = path.dirname(metaUrl);
export default {
	// 入口文件地址
	input: "src/index.ts", // 源文件入口
	output: [
		{
			file: "dist/index.esm.js", // package.json 中 "module": "dist/index.esm.js"
			format: "esm", // es module 形式的包， 用来import 导入， 可以tree shaking
			sourcemap: true
		},
		{
			file: "dist/index.cjs.js", // package.json 中 "main": "dist/index.cjs.js",
			format: "cjs", // commonjs 形式的包， require 导入
			sourcemap: true
		},
		{
			file: "dist/index.umd.js",
			name: "su-storage",
			format: "umd", // umd 兼容形式的包， 可以直接应用于网页 script
			sourcemap: true
		}
	],
	//  ts 插件
	plugins: [ts()]
};
