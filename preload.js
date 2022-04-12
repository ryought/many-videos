const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electronApi',
  {
    getLocalFileContent(arg) {
      return ipcRenderer.invoke('getLocalFileContent', arg)
    },
  }
)
