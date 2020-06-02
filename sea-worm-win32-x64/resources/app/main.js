const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    resizable: false,
    fullscreen: true,
    frame: false,
    thickFrame: false,
    webPreferences: {
      webSecurity: false
    },
    icon: `file://${__dirname}/dist/Battle/assets/Poker/logoJ.png`
  })

  win.loadURL(`file://${__dirname}/dist/SeaWorm/index.html`)


  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
