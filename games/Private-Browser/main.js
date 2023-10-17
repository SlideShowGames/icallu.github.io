try {
  require('electron-reloader')(module)
} catch (_) {}
// Modules to control application life and create native browser window
const {app, Menu, Tray, BrowserWindow, screen, ipcMain, ipcRenderer, globalShortcut} = require('electron')
const path = require('path')
let { searchEngineURL } = require('./global-data')

let tray;
let winMain;
let winMainWidth;
let winMainHeight;
let screenWidth, screenHeight;
let childWindows = [];

// CHILD-WINDOW
function createChildWindow(url) {
  console.log("Creating child window: "+url)
  // Create the browser window.
  let childWindow = new BrowserWindow({
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000000',
    frame: false,
    show: true
  })
  let index = childWindows.length;
  childWindows[index] = childWindow;

  // and load the index.html of the app.
  childWindow.loadURL(url)
  //childWindow.webContents.openDevTools({ mode: 'detach' });
  console.log("Created child window at index "+index+": " + url)
  return index;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log("Initialising Brome...")

  // CREATE TRAY
  tray = new Tray(path.join("assets/Brome_icon.png"))
  tray.setToolTip('Brome')
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Exit', click: () => {
      app.quit()
    }}
  ]))

  // FETCH WIDTH AND HEIGHT
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  screenWidth = width
  screenHeight = height

  // CREATE MAIN BROME WINDOW
  winMainHeight = parseInt(height / 100 * 5, 10);// to get 5% of the screen height: height / 100 * 2 // parseInt because double not supported
  winMainWidth = parseInt(width / 100 * 5, 10);// to get 5% of the screen width
  
    // CREATE MAIN BROME WINDOW
  winMain = new BrowserWindow({
    width: winMainWidth,
    height: winMainHeight, 
    maxWidth: winMainWidth,
    maxHeight: winMainHeight,
    minWidth: winMainWidth,
    minHeight: winMainHeight,
    x: parseInt((primaryDisplay.size.width / 2) - (winMainWidth / 2)),
    y: 0,
    frame: false,
    backgroundColor: '#00FFFFFF',
    webPreferences: {
      preload: path.join(__dirname, 'child-preload.js'),
    },
    transparent: true,
    resizable: false,
    movable: false
  })
  winMain.setAlwaysOnTop(true)
  winMain.loadFile('brome.html')
  winMain.show()
  //bromeWindow.webContents.openDevTools({ mode: 'detach' });
  console.log("Created main Brome window with " + winMainWidth + "px width " + winMainHeight + "px height.")

  // REGISTER LISTENERS (always at end after all objects were initialized)
  globalShortcut.register('CommandOrControl+Shift+B', () => {
    winMain.show()
  })
  console.log("Registered listeners.")

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) winMain.show()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on("win-minimize", (event, args) => {
  winMain.minimize()
});
ipcMain.on("win-maximize", (event, args) => {
  winMain.maximize()
});
ipcMain.on("win-unmaximize", (event, args) => {
  winMain.unmaximize()
});
ipcMain.on("win-close", (event, args) => {
  winMain.close()
});

// Child window events
ipcMain.on("child-win-open", (event, url) => { // Requires an url
  event.returnValue = createChildWindow(url); // Returns the newly created windows index in the child windows list
});
ipcMain.on("child-win-close", (event, windowIndex) => { // Requires the child window index
  childWindows[windowIndex].close();
});
