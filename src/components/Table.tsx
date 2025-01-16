import React from "react";

interface TableProps {
    allChars: CharData[];
    selectedChar: number;
}

export default function Table({ allChars, selectedChar }: TableProps) {
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
                                <td>{item._quantity}</td>
                            </tr>
                        )
                    )}
            </tbody>
        </table>
    );
}
