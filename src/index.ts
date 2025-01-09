import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFileSync, existsSync, mkdirSync, writeFile } from "fs";
import { join } from "node:path";
import settings from "electron-settings";

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

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("get-char-data", async () => {
    let dir = await settings.get("directory.path");
    console.log("Directory:", dir);
    console.log("Settings file: ", settings.file());

    if (!dir) {
      const directory = dialog.showOpenDialogSync({
        properties: ["openDirectory"],
      });

      if (!directory) {
        win.close();
        return;
      }

      dir = directory[0];
      settings.set("directory", {
        path: dir,
      });
    }

    return getChar(dir.toString(), 1);
  });

  ipcMain.on("backup-save", (event, arg: string) => {
    const dir = settings.get("directory.path");

    if (!dir) {
      dialog.showErrorBox(
        "Error",
        "Please set the directory before attempting to backup"
      );
      return;
    }

    console.log("Button was pressed with argument:", arg);
    backupFile(dir.toString());
  });

  ipcMain.on("change-path", () => {
    const dir = dialog.showOpenDialogSync({
      properties: ["openDirectory"],
    });

    if (!dir) {
      return;
    }

    settings.set("directory", {
      path: dir[0],
    });
    win.reload();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

function getChar(dir: string, character: number) {
  const charFile = join(
    dir,
    `/ATLYSS_Data/profileCollections/atl_characterProfile_${character}`
  );

  const jsonData = readFileSync(charFile, "utf8");

  const charData = JSON.parse(jsonData);

  return charData;
}

function backupFile(dir: string) {
  const charFile = join(
    dir,
    "/ATLYSS_Data/profileCollections/atl_characterProfile_1"
  );

  const jsonData = readFileSync(charFile, "utf8");

  if (!existsSync("./backups")) {
    mkdirSync("./backups", { recursive: true });
  }

  writeFile("./backups/atl_characterProfile_1", jsonData, (err) => {
    if (err) {
      console.log("Error creating backup:", err);
    } else {
      console.log("Backup success");
    }
  });
}
