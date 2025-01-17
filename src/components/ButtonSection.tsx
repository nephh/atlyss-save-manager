import { Button } from "@/components/ui/button";
import React from "react";

interface ButtonSectionProps {
    selectedChar: number;
    charData: CharData[];
    setHasChanged: (hasChanged: boolean) => void;
}

export default function ButtonSection({
    selectedChar,
    charData,
    setHasChanged,
}: ButtonSectionProps) {
    function handleReplaceBtn() {
        window.api.replaceFile(selectedChar);
        setHasChanged(true);
    }
    return (
        <>
            <button
                className="rounded-md bg-zinc-800 p-2 text-zinc-200"
                id="backup-btn"
                onClick={() => window.api.backupSave(selectedChar)}
            >
                Backup Save
            </button>
            {/* Change this to restore backup */}
            <button id="replace-btn" onClick={() => handleReplaceBtn()}>
                Replace Game Save With Backup
            </button>
            <button id="path-change-btn">Change ATLYSS Install Path</button>
            <button
                id="save-btn"
                onClick={() => window.api.saveFile(charData, selectedChar)}
            >
                Save Changes
            </button>
        </>
    );
}
