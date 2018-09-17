const path = require('path');
const url = require('url');
const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {}
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.loadURL(url.format({
    pathname : path.join(__dirname, 'index.html'),
    protocol : 'file:',
    slashes  : true
  }));
}

app.on('ready', () => {
  createWindow();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }

// ctrl + q でアプリを終了
globalShortcut.register('ctrl+q', () => {
  mainWindow.close();
  app.quit();
});

// ctrl + f でフルスクリーン切り替え
globalShortcut.register('ctrl+f', () => {
  mainWindow.setFullScreen(true);
});

});