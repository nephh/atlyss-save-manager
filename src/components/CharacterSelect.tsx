import React, { createRef, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "./ui/alert-dialog";

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
    const selectRef = createRef<HTMLSelectElement>();

    useEffect(() => {
        const select = selectRef.current;

        if (!select) {
            return;
        }

        function handleChange() {
            if (dataChanged) {
                // <AlertDialog>
                //     <AlertDialogContent>
                //         <AlertDialogHeader>Save Changes?</AlertDialogHeader>
                //         <AlertDialogDescription>
                //             You have unsaved changes. Would you like to save
                //             them before switching characters?
                //         </AlertDialogDescription>
                //         <AlertDialogFooter>
                //             <button>Save Changes</button>
                //             <button>Discard Changes</button>
                //         </AlertDialogFooter>
                //     </AlertDialogContent>
                // </AlertDialog>;
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
