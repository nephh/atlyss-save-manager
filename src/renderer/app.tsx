import React from "react";
import { createRoot } from "react-dom/client";
import Manager from "./Manager";
import "./index.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const root = createRoot(document.body);
root.render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-2">
            <div className="flex h-full flex-col items-center justify-center overflow-auto bg-zinc-100 p-4 dark:bg-zinc-900">
                <Manager />
            </div>
        </div>
    </ThemeProvider>,
);
