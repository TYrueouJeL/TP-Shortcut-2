import { useState, useEffect } from "react";
import { getCollection } from "../api";
import type { Shortcut } from "../api";
import ShortcutCard from "./ShortcutCard";

export default function ShortcutList() {
    const [shortcuts, setShortcuts] = useState<Shortcut[]|null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchShortcuts() {
        setLoading(true);
        const shortcuts = await getCollection<Shortcut>("shortcuts");
        setShortcuts(shortcuts);
        setLoading(false);
    }

    useEffect(() => {
        fetchShortcuts();
    }, []);

    let content;
    if (loading || shortcuts === null) {
        content = <p>Chargement en cours...</p>;
    } else if (shortcuts.length === 0) {
        content = <p>Aucun raccourci trouvé.</p>;
    } else {
        content = shortcuts.map(s => <ShortcutCard key={s.id} shortcut={s}/>);
    }

    return (
        <div className="grid">
            {content}
        </div>
    );
}