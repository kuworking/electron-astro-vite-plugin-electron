import { app, BrowserWindow } from 'electron'
import * as url from 'url'
import { start_server } from './server.js'

const isDev = !app.isPackaged || process.env.NODE_ENV == 'development'

const start = async () => {
  await app.whenReady()
  createWindow()
  start_server()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'electron-astro-vite-plugin-electron',
    width: 600,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      sandbox: false,
      preload: url.fileURLToPath(new URL('preload.mjs', import.meta.url)),
    },
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL + 'index.html')
  else mainWindow.loadFile('dist/index.html')

  // Create the browser window.
  const secondWindow = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      sandbox: false,
      preload: url.fileURLToPath(new URL('preload.mjs', import.meta.url)),
    },
  })

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) secondWindow.loadURL(process.env.VITE_DEV_SERVER_URL + 'index2.html')
  else secondWindow.loadFile('dist/index2.html')

  if (isDev) {
    mainWindow.webContents.openDevTools()
    secondWindow.webContents.openDevTools()
  }
}

start()
