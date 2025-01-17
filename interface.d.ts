export interface ElectronAPI {
    getCharData: () => Promise<CharData[]>;
    backupSave: (charNum: number) => void;
    changePath: () => void;
    updateItem: (
        itemName: string,
        quantity: number,
        charNumber: number
    ) => void;
    saveFile: (charData: CharData[], charNum: number) => void;
    replaceFile: (charNum: number) => void;
}

// Electron is weird about importing types in the renderer, so we
// just declare them globally
declare global {
    interface Window {
        api: ElectronAPI;
    }

    interface CharData {
        _nickName: string;
        _currency: string;
        _inventoryProfile: InventoryItem[];
    }

    interface InventoryItem {
        _itemName: string;
        _quantity: number;
    }
}
