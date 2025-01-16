import React, { useEffect, useState } from "react";
import CharacterSelect from "../components/CharacterSelect";
import ButtonSection from "../components/ButtonSection";
import Table from "../components/Table";

export default function Manager() {
    const [charData, setCharData] = useState<CharData[]>([]);
    const [selectedChar, setSelectedChar] = useState(0);

    async function fetchData() {
        const data = await window.api.getCharData();
        setCharData(data);
    }

    // We might not need to put fetchData in the useEffect, but it might be necessary once we start changing
    // the data and want to display the changes
    //
    useEffect(() => {
        fetchData();
    }, []);

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
            <ButtonSection selectedChar={selectedChar} />
            <Table allChars={charData} selectedChar={selectedChar} />
        </>
    );
}
