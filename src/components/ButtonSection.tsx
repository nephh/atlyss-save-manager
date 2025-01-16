import React from "react";

interface ButtonSectionProps {
    selectedChar: number;
}

export default function ButtonSection({ selectedChar }: ButtonSectionProps) {
    return (
        <>
            <button
                id="backup-btn"
                onClick={() => window.api.backupSave(selectedChar)}
            >
                Backup Save
            </button>
            <button
                id="replace-btn"
                onClick={() => window.api.replaceFile(selectedChar)}
            >
                Replace Game Save With Backup
            </button>
            <button id="path-change-btn">Change ATLYSS Install Path</button>
            <button id="save-btn">Save Changes</button>
        </>
    );
}
