import React, { useEffect, useState } from "react";

export default function CharacterSelect() {
    const [charData, setCharData] = useState({ allChars: [], currentChar: 0 });

    useEffect(() => {
        async function fetchData() {
            const data = await window.api.getCharData();
            setCharData(data);
        }
        fetchData();
    }, []);

    const { allChars, currentChar } = charData;

    return (
        <div>
            <select>
                {allChars.map((char, index) => (
                    <option key={index}>{char._nickName}</option>
                ))}
            </select>
            {allChars.length > 0 && (
                <>
                    <h1>Character Name: {allChars[currentChar]._nickName}</h1>
                    <p>Currency: {allChars[currentChar]._currency}</p>
                </>
            )}
        </div>
    );
}
