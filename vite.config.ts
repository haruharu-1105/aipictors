import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev"
// import { analyzer } from "vite-bundle-analyzer"

// import million from "million/compiler"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  ssr: {
    noExternal: ["react-easy-crop", "tslib"],
  },
  plugins: [
    // Error: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.
    // million.vite({ auto: true }),
    remixCloudflareDevProxy(),
    remix(),
    tsconfigPaths(),
    // analyzer({ analyzerMode: "server", openAnalyzer: true }),
  ],
  define: {
    VITE_VERSION: JSON.stringify(process.env.npm_package_version),
  },
})
