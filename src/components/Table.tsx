import { dialog } from "electron";
import React from "react";

interface TableProps {
    allChars: CharData[];
    selectedChar: number;
    setCharData: (data: CharData[]) => void;
}

export default function Table({
    allChars,
    selectedChar,
    setCharData,
}: TableProps) {
    function handleClick(
        e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
    ) {
        const target = e.currentTarget;
        const originalValue = target.innerText;
        const input = document.createElement("input");
        input.type = "text";
        input.value = originalValue;
        target.innerText = "";
        target.appendChild(input);
        input.focus();

        input.addEventListener("blur", () => {
            target.innerText = input.value;
            // Update the actual data
            const itemCell = target.parentElement as HTMLTableRowElement;

            console.log("Item Name: ", itemCell.cells[0].innerText);
            const itemName = itemCell.cells[0].innerText;
            const quantity = parseInt(input.value);

            const newCharData: CharData[] = [...allChars];
            const item = newCharData[selectedChar]._inventoryProfile.find(
                (item) => item._itemName === itemName
            );

            // if (!item) {
            //     dialog.showErrorBox(
            //         "Error!",
            //         "Item not found in character inventory"
            //     );
            //     return;
            // }

            item._quantity = quantity;

            setCharData(newCharData);
            // window.api.updateItem(itemName, quantity, selectedChar);
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody id="inventory-items">
                {allChars.length > 0 &&
                    allChars[selectedChar]._inventoryProfile.map(
                        (item, index) => (
                            <tr key={index}>
                                <td>{item._itemName}</td>
                                <td onDoubleClick={(e) => handleClick(e)}>
                                    {item._quantity}
                                </td>
                            </tr>
                        )
                    )}
            </tbody>
        </table>
    );
}
