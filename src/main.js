const { app, BrowserWindow, clipboard, screen, ipcMain } = require('electron');
const path = require('path');
const { registerGlobalShortcuts, unregisterGlobalShortcuts } = require('./keys');
const { Notify, checkApplications,checkMultipleDisplays, disableSecondaryDisplays, enableAllDisplays } = require('./utility');

let mainWindow;


function createWindow() {
    mainWindow = new BrowserWindow({
    // This attribute would ensure that window is always
    // opened in fullscreen. However, this doesn't have
    // control over the state of the window after initialization.
    fullscreen: true,
    width: screen.width, // Adjust the width as needed
    height: screen.height, // Adjust the height as needed
    title: 'UniApps Exam Browser', // Set an empty string to hide the title bar
    // Hide the window frame (title bar and menu bar)
    // frame: false,
    // Hide the menu bar
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
  }
  });

  // Load your desired URL
  mainWindow.loadFile(
    'src/index.html'
    );

  mainWindow.setAlwaysOnTop(true);
  mainWindow.setFullScreen(true);
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.show();



  // mainWindow.loadURL('https://10000.uniappsdemo.in', {
  //    userAgent: 'UniApps certified exam browser',
  // });

  // mainWindow.loadFile('src/index.html');

  // mainWindow.setAlwaysOnTop(true);

  mainWindow.webContents.on('did-finish-load', () => {
    // Retrieve the user agent
    // const userAgent = ;
    // console.log('User Agent:', mainWindow.webContents.getUserAgent());
    // Do whatever verification or processing you need with the user agent
  });

  mainWindow.webContents.on('before-input-event', (event, input) =>{
    // console.log(input);
    if (input.alt || input.meta){
      console.log("Special keys used ",input.key);
      event.preventDefault();
    }
  });

  mainWindow.on('resize', () => {
    mainWindow.setFullScreen(true);
  });

  // Open DevTools (optional)
  // mainWindow.webContents.openDevTools();
}

// Create the Electron window when the app is ready
app.whenReady().then(() => {
  
  // app.requestSingleInstanceLock();
  // console.log("IS RDS?: ", checkApplications("anydesk"));
  const checkInterval = setInterval(() => {
    checkApplications("anydesk");
    if(checkMultipleDisplays()){
      disableSecondaryDisplays();
      mainWindow.moveTop();
    }
  }, 5000); // 5000 ms (5 seconds)

  // Check if multiple displays are attached
  if (!checkMultipleDisplays()){
  
  // Disable any additional displays if attached
  disableSecondaryDisplays();
  
  createWindow();
  registerGlobalShortcuts();
  clipboard.clear();
  
  ipcMain.on('urlSubmitted', (event, url) => {
    console.log("URL: ",url);
    // Open the URL in the same Electron BrowserWindow
    mainWindow.loadURL(
      // "192.168.1.201:9000"
      url,
      {userAgent: 'UniApps-1.0'});
  });

  app.on('browser-window-blur', (event, window) => {
    event.preventDefault();
    window.moveTop();
  });
  
  // Quit when all windows are closed
  app.on('window-all-closed', () => {
    // On macOS, it's common for apps to stay open until explicitly quit
    if (process.platform !== 'darwin') {
        unregisterGlobalShortcuts();
        clipboard.clear();
        // enableAllDisplays();
        clearInterval(checkInterval);
        createWindow();
        // app.releaseSingleInstanceLock();
        // app.quit();
    }
  });

// Activate the app (on macOS)
app.on('activate', () => {
  // On macOS, re-create a window if none are open when the dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
} else{
  console.log("Multiple displays detected");
  Notify("Critical Alert", "Cannot initiate with multiple displays attached!");
}
});

