// main.js
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Handle the 'save-video' Inter-Process Communication call
ipcMain.handle("save-video", async (event, { buffer, filename }) => {
  try {
    // Save to user's Documents folder
    const savePath = path.join(app.getPath("documents"), filename);
    fs.writeFileSync(savePath, buffer);
    return { success: true, path: savePath };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
