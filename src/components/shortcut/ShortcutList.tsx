import { useState, useEffect } from "react";
import { getCollection } from "../../api.ts";
import type { Shortcut } from "../../api.ts";
import ShortcutCard from "./ShortcutCard.tsx";

export default function ShortcutList({categoryId, pageNumber}: { categoryId: number, pageNumber: number }) {
    const [shortcuts, setShortcuts] = useState<Shortcut[]|null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchShortcuts(pageNumber: number, categoryId: number) {
        setLoading(true);
        const shortcuts = await getCollection<Shortcut>(pageNumber, categoryId);
        setShortcuts(shortcuts);
        setLoading(false);
    }

    useEffect(() => {
        fetchShortcuts(pageNumber, categoryId);
    }, [pageNumber, categoryId]);

    let content;
    if (loading || shortcuts === null) {
        content = <p className="text-gray-500">Chargement en cours...</p>;
    } else if (shortcuts.length === 0) {
        content = <p className="text-gray-500">Aucun raccourci trouvé.</p>;
    } else {
        content = shortcuts.map(s => <ShortcutCard key={s.id} shortcut={s}/>);
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4 ml-2 mr-2">
            {content}
        </div>
    );
}