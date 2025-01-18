import { app, BrowserWindow, dialog, ipcMain, screen } from "electron";
import path from "path";
import started from "electron-squirrel-startup";
import settings from "electron-settings";
import {
    getDir,
    getCharFiles,
    backupFile,
    saveFile,
    replaceFile,
} from "./lib/helpers";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit();
}

let mainWindow: BrowserWindow;

const createWindow = () => {
    // Create the browser window.
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        width: width / 2,
        height: height / 2,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
            ),
        );
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
app.whenReady().then(async () => {
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and import them here.
    // let currentChar = 0;

    const dir = await getDir();

    ipcMain.handle("get-char-data", () => {
        return getCharFiles(dir);
    });

    ipcMain.on("backup-save", (event, charNum) => {
        backupFile(dir, charNum);
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

        getCharFiles(dir[0]);
        mainWindow.reload();
    });

    ipcMain.on("save-file", (event, charData, charNum) => {
        saveFile(dir, charData, charNum);
    });

    ipcMain.on("replace-file", (event, charNum) => {
        replaceFile(dir, charNum);
        // currentChar = charNum;
        // mainWindow.reload();
    });
});
