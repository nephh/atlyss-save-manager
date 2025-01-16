import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getCharData: () => ipcRenderer.invoke("get-char-data"),
    backupSave: (charNum: number) => ipcRenderer.send("backup-save", charNum),
    changePath: () => ipcRenderer.send("change-path"),
    saveFile: (charData: CharData[], charNum: number) =>
        ipcRenderer.send("save-file", charData, charNum),
    replaceFile: (charNum: number) => ipcRenderer.send("replace-file", charNum),
    updateItem: (itemName: string, quantity: number, charNumber: number) =>
        ipcRenderer.send("update-item", itemName, quantity, charNumber),
});
