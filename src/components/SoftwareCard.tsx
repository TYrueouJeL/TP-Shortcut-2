import type { Software } from "../api";

interface Props {
    software: Software;
}

export default function SoftwareCard({software}: Props) {
    let imageUrl = null;
    if (software.logo) {
        imageUrl = `https://shortcuts.api.pierre-jehan.com/${software.logo.contentUrl}`;
    } else {
        imageUrl = 'https://placeholdit.com/35x35';
    }

    return (
        <article className="card software-card">
            <img src={imageUrl} alt={software.name}/>
            <h3>{software.name}</h3>
        </article>
    );
}