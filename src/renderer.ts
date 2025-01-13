const charName = document.getElementById("char-name");
const currency = document.getElementById("currency");
const backupBtn = document.getElementById("backup-btn");
const pathChangeBtn = document.getElementById("path-change-btn");
const table = document.getElementById(
    "inventory-items",
) as HTMLTableSectionElement;
const selector = document.getElementById("char-select") as HTMLSelectElement;

window.api.getCharData().then((charData: CharData[]) => {
    charData.forEach((char: CharData) => {
        const option = document.createElement("option");
        option.text = char._nickName;
        selector.add(option);
    });

    selector.addEventListener("change", () => {
        const selectedChar = charData[selector.selectedIndex];
        charName!.innerText = selectedChar._nickName;
        currency!.innerText = selectedChar._currency;

        if (table.rows.length > 0) {
            while (table.rows.length > 0) {
                table.deleteRow(0);
            }
        }

        selectedChar._inventoryProfile.forEach((item: InventoryItem) => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.innerText = item._itemName;
            cell2.innerText = item._quantity.toString();
        });
    });

    charName!.innerText = charData[0]._nickName;
    currency!.innerText = charData[0]._currency;

    charData[0]._inventoryProfile.forEach((item: InventoryItem) => {
        console.log("Item Name:", item._itemName);
        console.log("Quantity:", item._quantity);
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerText = item._itemName;
        cell2.innerText = item._quantity.toString();
    });
});

backupBtn!.addEventListener("click", () => {
    window.api.backupSave("This would be the current file");
});

pathChangeBtn!.addEventListener("click", () => {
    window.api.changePath();
});

table!.addEventListener("dblclick", (event) => {
    const target = event.target as HTMLElement;
    if (target && target.tagName === "TD") {
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

            window.api.updateItem(itemName, quantity, selector.selectedIndex);
        });

        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    }
});
