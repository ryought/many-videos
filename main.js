const { app, BrowserWindow, screen, ipcMain } = require('electron')
const fs = require("fs").promises
const path = require('path')

ipcMain.handle('getLocalFileContent', (event, arg) => {
  console.log('ipcMain hoge')
  return fs.readFile(arg)
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})
