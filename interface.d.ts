export interface ElectronAPI {
  getCharData: () => Promise<CharData>;
  backupSave: (arg: string) => void;
  changePath: () => void;
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
