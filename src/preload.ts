import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    getCharData: () => ipcRenderer.invoke("get-char-data"),
    backupSave: (arg: string) => ipcRenderer.send("backup-save", arg),
    changePath: () => ipcRenderer.send("change-path"),
    updateItem: (itemName: string, quantity: number, charNumber: number) =>
        ipcRenderer.send("update-item", itemName, quantity, charNumber),
});
