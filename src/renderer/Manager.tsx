import React, { useEffect, useState } from "react";
import CharacterSelect from "../components/CharacterSelect";
import ButtonSection from "../components/ButtonSection";
import Table from "../components/Table";

export default function Manager() {
    const [charData, setCharData] = useState<CharData[]>([]);
    const [selectedChar, setSelectedChar] = useState(0);
    const [hasChanged, setHasChanged] = useState(false);

    async function fetchData() {
        const data = await window.api.getCharData();
        setCharData(data);
    }

    useEffect(() => {
        fetchData();
        setHasChanged(false);
    }, [selectedChar, hasChanged === true]);

    if (charData.length === 0) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <CharacterSelect
                allChars={charData}
                selectedChar={selectedChar}
                setSelectedChar={setSelectedChar}
            />
            <ButtonSection
                selectedChar={selectedChar}
                charData={charData}
                setHasChanged={setHasChanged}
            />
            <Table
                allChars={charData}
                selectedChar={selectedChar}
                setCharData={setCharData}
            />
        </>
    );
}
