import React, { useState, useEffect } from "react";

interface ButtonSectionProps {
    selectRef: React.RefObject<HTMLSelectElement>;
}

export default function ButtonSection({ selectRef }: ButtonSectionProps) {
    const [selectedChar, setSelectedChar] = useState(0);

    useEffect(() => {
        const select = selectRef.current;

        if (select) {
            const handleChange = () => {
                setSelectedChar(select.selectedIndex);
            };

            select.addEventListener("change", handleChange);

            return () => {
                select.removeEventListener("change", handleChange);
            };
        }
    });

    return (
        <>
            <button
                id="backup-btn"
                onClick={() => window.api.backupSave(selectedChar)}
            >
                Backup Save
            </button>
            <button id="replace-btn">Replace Game Save With Backup</button>
            <button id="path-change-btn">Change ATLYSS Install Path</button>
            <button id="save-btn">Save Changes</button>
        </>
    );
}
