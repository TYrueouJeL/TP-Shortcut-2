import type { Software } from "../../api.ts";

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
        <article className="card-button flex flex-row">
            <img src={imageUrl} alt={software.name} className={"object-cover"} style={{ width: '35px', height: '35px'}}/>
            <h3>{software.name}</h3>
        </article>
    );
}