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
        <article style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img src={imageUrl} alt={software.name} style={{ height: "35px" }}/>
            <h3>{software.name}</h3>
        </article>
    );
}