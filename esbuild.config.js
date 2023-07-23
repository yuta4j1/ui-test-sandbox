require("esbuild")
	.build({
		entryPoints: ["server/app.ts"],
		bundle: true,
		platform: "node",
		outfile: "dist/server.js",
	})
	.catch(() => process.exit(1));
