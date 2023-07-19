const { app, BrowserWindow, globalShortcut, clipboard } = require('electron');
const {registerGlobalShortcuts, unregisterGlobalShortcuts} = require('./keys');

function createWindow() {
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    width: 800, // Adjust the width as needed
    height: 600, // Adjust the height as needed
    title: 'UniApps Exam Browser', // Set an empty string to hide the title bar
    // Hide the window frame (title bar and menu bar)
    // frame: false,
    // Hide the menu bar
    autoHideMenuBar: true
  });

  // Load your desired URL
  mainWindow.loadURL('https://uniappsdemo.in', {
    // userAgent: 'UniApps certified exam browser'
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Retrieve the user agent
    // const userAgent = ;
    console.log('User Agent:', mainWindow.webContents.getUserAgent());
    // Do whatever verification or processing you need with the user agent
  });

  // Open DevTools (optional)
  // mainWindow.webContents.openDevTools();
}

// Create the Electron window when the app is ready
app.whenReady().then(() => {
  createWindow();
  registerGlobalShortcuts();

  clipboard.clear();
  
  // Quit when all windows are closed
  app.on('window-all-closed', () => {
    // On macOS, it's common for apps to stay open until explicitly quit
    if (process.platform !== 'darwin') {
        unregisterGlobalShortcuts();
        clipboard.clear();
      app.quit();
    }
  });
});

// Activate the app (on macOS)
app.on('activate', () => {
  // On macOS, re-create a window if none are open when the dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
