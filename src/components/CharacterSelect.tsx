import React, { useEffect, useState } from "react";

interface CharacterSelectProps {
    allChars: CharData[];
    selectRef: React.RefObject<HTMLSelectElement>;
}

export default function CharacterSelect({
    allChars,
    selectRef,
}: CharacterSelectProps) {
    const [selectedChar, setSelectedChar] = useState(0);

    useEffect(() => {
        const select = selectRef.current;
        if (select) {
            const handleChange = () => {
                setSelectedChar(select.selectedIndex);
            };

            select.addEventListener("change", handleChange);

            // Cleanup event listener on component unmount
            return () => {
                select.removeEventListener("change", handleChange);
            };
        }
    }, []);

    return (
        <div>
            <select ref={selectRef}>
                {allChars.map((char, index) => (
                    <option key={index}>{char._nickName}</option>
                ))}
            </select>
            {allChars.length > 0 && (
                <>
                    <h1>Character Name: {allChars[selectedChar]._nickName}</h1>
                    <p>Currency: {allChars[selectedChar]._currency}</p>
                </>
            )}
        </div>
    );
}
