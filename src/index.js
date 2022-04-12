const { app, BrowserWindow, screen } = require('electron');

app.on('ready', () => {
  console.log('ready')
  const screenSize = screen.getPrimaryDisplay().size
  const mainWindow = new BrowserWindow({
      width: Math.min(1920, screenSize.width),
      height: Math.min(1080, screenSize.height),
      transparent: true,
      webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
      }
  })
  mainWindow.setMaximizable(true)
  mainWindow.loadURL('../index.html')
  mainWindow.webContents.openDevTools()
})
