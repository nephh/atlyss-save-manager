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
            <Button
                variant="outline"
                id="backup-btn"
                onClick={() => window.api.backupSave(selectedChar)}
            >
                Backup Save
            </Button>
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
