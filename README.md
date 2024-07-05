# Example of using astro to populate your Electron App

Completely based on the package [astro-electron](https://github.com/Igloczek/astro-electron) and its integration with [vite-plugin-electron](https://github.com/electron-vite/vite-plugin-electron).

This is only a template for those that want to keep using [astro](https://astro.build/) when working with [electronJS](https://www.electronjs.org/).

I have added [electron-builder](https://www.electron.build/) and also implemented a way to read files through `electronAPI`.

It should not contain a single `require`, which is always nice.

And it also includes React.

```
npm install
npm run dev
npm run build // tested on MacOs
```
