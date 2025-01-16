import React, { useEffect, useState } from "react";
import CharacterSelect from "./components/CharacterSelect";
import ButtonSection from "./components/ButtonSection";

export default function Manager() {
    const [charData, setCharData] = useState({ allChars: [], currentChar: 0 });
    const selectRef = React.createRef<HTMLSelectElement>();

    useEffect(() => {
        async function fetchData() {
            const data = await window.api.getCharData();
            setCharData(data);
        }
        fetchData();
    }, []);

    return (
        <>
            <CharacterSelect
                allChars={charData.allChars}
                selectRef={selectRef}
            />
            <ButtonSection selectRef={selectRef} />
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
