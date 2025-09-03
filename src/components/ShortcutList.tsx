import { use } from "react";
import { getCollection } from "../api";
import type { Shortcut } from "../api";
import ShortcutCard from "./ShortcutCard";

const getShortcutsPromise = getCollection<Shortcut>("shortcuts"); // The same Promise instance is reused across renders instead of creating new ones, which prevents the infinite loop. React automatically caches the result without needing the explicit cache() function.

export default function ShortcutList() {
    const shortcuts = use(getShortcutsPromise); // const shortcuts = use(getCollection<Shortcut>("shortcuts")); ===> infinite loop

    const shortcutCards = shortcuts.map(s => <ShortcutCard key={s.id} shortcut={s}/>);

    return (
        <div style={{ display: "grid", gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {shortcutCards}
        </div>
    );
}