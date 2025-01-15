import React from "react";
import CharacterSelect from "./components/CharacterSelect";

export default function Manager() {
    return (
        <>
            <CharacterSelect />
            <button id="backup-btn">Backup Save</button>
            <button id="replace-btn">Replace Game Save With Backup</button>
            <button id="path-change-btn">Change ATLYSS Install Path</button>
            <button id="save-btn">Save Changes</button>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody id="inventory-items"></tbody>
            </table>
        </>
    );
}
