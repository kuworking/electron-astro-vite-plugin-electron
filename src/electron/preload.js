import { contextBridge, ipcRenderer } from 'electron'

console.log('>>>>>>>>>>>>>>>>>>>>> preload.js is loaded')

// https://www.electronjs.org/docs/latest/api/context-bridge
// The contextBridge can be used by the preload script to give your renderer access to Node APIs.
contextBridge.exposeInMainWorld('electronAPI', {
  test: () => ipcRenderer.sendSync('test'),
  getFile: name => ipcRenderer.sendSync('getFile', name),
})
