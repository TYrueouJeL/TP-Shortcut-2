import type { Shortcut } from "../../api.ts";

interface Props {
    shortcut: Shortcut;
}

export default function ShortcutCard({ shortcut }: Props) {
    const categories = shortcut.categories.length > 0 ? shortcut.categories.map(c => c.name).join(", ") : "Aucune catégorie";

    return (
        <article className="card-button">
            <div className="flex flex-col">
                <h3>{shortcut.title}</h3>
                <p className="text-sm text-gray-500">{shortcut.description}</p>
                <p className="text-sm text-gray-500">{categories}</p>
                <p>{shortcut.context}</p>
                <div>
                    <p>Windows : {shortcut.windows}</p>
                    <p>Mac : {shortcut.macos}</p>
                    <p>Linux : {shortcut.linux}</p>
                </div>
            </div>
        </article>
    );
}