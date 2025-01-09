const charName = document.getElementById("char-name");
const currency = document.getElementById("currency");
const backupBtn = document.getElementById("backup-btn");
const pathChangeBtn = document.getElementById("path-change-btn");
const table = document.getElementById(
  "inventory-items"
) as HTMLTableSectionElement;

window.api.getCharData().then((charData: CharData) => {
  console.log(charData);
  charName!.innerText = charData._nickName;
  currency!.innerText = charData._currency;

  charData._inventoryProfile.forEach((item: InventoryItem) => {
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
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        input.blur();
      }
    });
  }
});
