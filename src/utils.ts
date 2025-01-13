import { join } from "path";
import { dialog } from "electron";
import settings from "electron-settings";
import {
    readFileSync,
    existsSync,
    mkdirSync,
    writeFile,
    readdirSync,
} from "fs";

export async function getDir() {
    let dir = await settings.get("directory.path");

    if (!dir) {
        const directory = dialog.showOpenDialogSync({
            properties: ["openDirectory"],
        });

        if (!directory) {
            dialog.showErrorBox("Error!", "Please select a directory");
            return "";
        }

        dir = directory[0];
        settings.set("directory", {
            path: dir,
        });
    }

    return dir.toString();
}

export function getChar(dir: string, character: number): CharData {
    const charFile = join(
        dir,
        `/ATLYSS_Data/profileCollections/atl_characterProfile_${character}`,
    );

    const jsonData = readFileSync(charFile, "utf8");

    const charData = JSON.parse(jsonData);

    return charData;
}

export function backupFile(dir: string) {
    const charFile = join(
        dir,
        "/ATLYSS_Data/profileCollections/atl_characterProfile_1",
    );

    if (!existsSync(charFile)) {
        dialog.showErrorBox(
            "Error!",
            `No character file found. Please make sure to select the ATLYSS install directory. \n
            This is usually: Steam\\steamapps\\common\\ATLYSS\\`,
        );
        return;
    }

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

export function getCharFiles(dir: string): CharData[] {
    let allCharData: CharData[] = [];
    const charFolder = join(dir, "/ATLYSS_Data/profileCollections/");

    if (!existsSync(charFolder)) {
        dialog.showErrorBox(
            "Error!",
            `No character files found. Please make sure to select the ATLYSS install directory. \n
            This is usually: Steam\\steamapps\\common\\ATLYSS\\`,
        );
        return [];
    }

    const allFiles = readdirSync(charFolder);

    const filteredFiles = allFiles.filter(
        (file) =>
            file.startsWith("atl_characterProfile_") && !file.endsWith("bak"),
    );

    filteredFiles.forEach((file) => {
        const jsonData = readFileSync(join(charFolder, file), "utf8");

        const charData = JSON.parse(jsonData);

        allCharData.push(charData);
    });

    return allCharData;
}

export async function updateItem(
    dir: string,
    itemName: string,
    quantity: number,
    charNumber: number,
) {
    const charData = getChar(dir, charNumber);

    const item = charData._inventoryProfile.find(
        (item: InventoryItem) => item._itemName === itemName,
    );

    if (!item) {
        dialog.showErrorBox("Error!", "Item not found in character inventory");
        return;
    }

    console.log("Item found: ", item);

    item._quantity = quantity;

    const updatedData = JSON.stringify(charData);

    writeFile(
        join(
            dir.toString(),
            `/ATLYSS_Data/profileCollections/atl_characterProfile_${charNumber}`,
        ),
        updatedData,
        (err) => {
            if (err) {
                console.log("Error updating item:", err);
            } else {
                console.log("Item updated successfully");
            }
        },
    );
}
