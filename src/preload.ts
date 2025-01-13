import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getCharData: () => ipcRenderer.invoke("get-char-data"),
    backupSave: () => ipcRenderer.send("backup-save"),
    changePath: () => ipcRenderer.send("change-path"),
    saveFile: (charNum: number) => ipcRenderer.send("save-file", charNum),
    replaceFile: (charNum: number) => ipcRenderer.send("replace-file", charNum),
    updateItem: (itemName: string, quantity: number, charNumber: number) =>
        ipcRenderer.send("update-item", itemName, quantity, charNumber),
});
