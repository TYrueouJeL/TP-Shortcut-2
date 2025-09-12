import type { Shortcut } from "../api";

interface Props {
    shortcut: Shortcut;
}

export default function ShortcutCard({ shortcut }: Props) {
    const categories = shortcut.categories.length > 0 ? shortcut.categories.map(c => c.name).join(", ") : "Aucune catégorie";

    return (
        <article>
            <h3>{shortcut.title}</h3>
            <p>{categories}</p>
            <p>{shortcut.description}</p>
            <p>{shortcut.context}</p>
            <ul>
                <li>Windows : { shortcut.windows }</li>
                <li>Mac : { shortcut.macos }</li>
                <li>Linux : { shortcut.linux }</li>
            </ul>
        </article>
    );
}