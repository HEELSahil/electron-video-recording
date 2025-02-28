// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveVideo: async (data) => {
    return ipcRenderer.invoke("save-video", data);
  },
});
