import React, { useEffect } from "react";

interface CharacterSelectProps {
    allChars: CharData[];
    selectedChar: number;
    setSelectedChar: (index: number) => void;
    dataChanged: boolean;
}

export default function CharacterSelect({
    allChars,
    selectedChar,
    setSelectedChar,
    dataChanged,
}: CharacterSelectProps) {
    const selectRef = React.createRef<HTMLSelectElement>();

    useEffect(() => {
        const select = selectRef.current;

        if (!select) {
            return;
        }

        function handleChange() {
            if (dataChanged) {
                
                return;
            }
            setSelectedChar(select.selectedIndex);
        }

        select.addEventListener("change", handleChange);

        // Cleanup event listener on component unmount
        return () => {
            select.removeEventListener("change", handleChange);
        };
    }, [setSelectedChar, dataChanged]);

    return (
        <div>
            <select ref={selectRef}>
                {allChars.map((char, index) => (
                    <option key={index}>{char._nickName}</option>
                ))}
            </select>
            {
                <>
                    <h1>Character Name: {allChars[selectedChar]._nickName}</h1>
                    <p>Currency: {allChars[selectedChar]._currency}</p>
                </>
            }
        </div>
    );
}
