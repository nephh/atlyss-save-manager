// Preload script is unable to be ran as an ESM module,
// so we need to use require
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCharData: () => ipcRenderer.invoke("get-char-data"),
  backupSave: (arg: string) => ipcRenderer.send("backup-save", arg),
  changePath: () => ipcRenderer.send("change-path"),
});
