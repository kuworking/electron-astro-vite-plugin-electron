import { ipcMain } from 'electron'
import * as url from 'url'
import path from 'path'
import fs from 'fs-extra'

// https://www.electronjs.org/docs/latest/tutorial/ipc

export const start_server = async () => {
  console.log('>>>>>>>>>>>>>>>>>>>>> server.js started')

  const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

  ipcMain.on('test', async (event, name) => (event.returnValue = 'test successful'))

  ipcMain.on(
    'getFile',
    async (event, name) => (event.returnValue = await fs.readFile(path.resolve(__dirname, '../data/' + name), 'utf8'))
  )
}
