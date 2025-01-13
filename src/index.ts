import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "node:path";
import settings from "electron-settings";
import { getDir, backupFile, getCharFiles, updateItem } from "./utils";

let win: BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
    });

    win.loadFile(join(__dirname, "../src/index.html"));
};

app.whenReady().then(async () => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    const dir = await getDir();

    let allChars = getCharFiles(dir);

    ipcMain.handle("get-char-data", () => {
        return allChars;
    });

    ipcMain.on(
        "update-item",
        async (
            event,
            itemName: string,
            quantity: number,
            charNumber: number,
        ) => {
            console.log(
                itemName,
                "updated with value:",
                quantity,
                "On character: ",
                charNumber,
            );

            await updateItem(dir, itemName, quantity, charNumber);
        },
    );

    ipcMain.on("backup-save", (event, arg: string) => {
        backupFile(dir);
    });

    ipcMain.on("change-path", () => {
        const dir = dialog.showOpenDialogSync({
            properties: ["openDirectory"],
        });

        if (!dir) {
            dialog.showErrorBox("Error!", "Please select a directory");
            return;
        }

        settings.set("directory", {
            path: dir[0],
        });

        allChars = getCharFiles(dir[0]);
        win.reload();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
