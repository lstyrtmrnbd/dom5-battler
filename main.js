const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow () {

    console.log(__dirname);

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    //mainWindow.removeMenu();
    mainWindow.loadFile('index.html');
}

// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit();
});
