import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import solid from '@astrojs/solid-js'
import vitePluginElectron from 'vite-plugin-electron/simple'
import path from 'path'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['**/react/**/*'],
    }),
    solid(
      {
        include: ['**/solid/**/*'],
      },
      { devtools: false } // doesn't work with electron
    ),
    {
      // cloned from astro-electron integration 0.3.1
      name: 'electron-astro-vite-plugin-electron',
      hooks: {
        'astro:config:setup': ({ config, command, updateConfig }) => {
          if (command === 'build') {
            updateConfig({
              base: '/astro-electron',
            })
          }

          // Add Vite plugin for Electron https://github.com/electron-vite/vite-plugin-electron
          updateConfig({
            vite: {
              plugins: [
                vitePluginElectron({
                  main: {
                    entry: 'src/electron/main.js',
                    vite: {
                      ...config.vite,
                      server: {
                        watch: {
                          usePolling: true, // Assegura la detecció de fitxers canviants
                          interval: 300, // Temps d'espera més alt entre comprovacions
                        },
                      },
                    },
                  },
                  preload: {
                    input: 'src/electron/preload.js',
                    vite: config.vite,
                  },
                  renderer: undefined,
                }),
              ],
            },
          })
        },
        'astro:build:done': async ({ dir, routes }) => {
          await Promise.all(
            routes.map(async route => {
              const file = fs.readFileSync(route.distURL, 'utf-8')
              const localDir = path.dirname(route.distURL.pathname)
              const relativePath = path.relative(localDir, dir.pathname)

              fs.writeFileSync(route.distURL, file.replaceAll(/\/(astro-electron|public)/g, relativePath || '.'))
            })
          )
        },
      },
    },
  ],
  build: { format: 'file' },
  // build file: Astro will generate an HTML file named for each page route.
  // (e.g. src/pages/about.astro and src/pages/about/index.astro both build the file /about.html
})
