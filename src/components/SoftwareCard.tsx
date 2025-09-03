import type { Software } from "../api";

interface Props {
    software: Software;
}

export default function SoftwareCard({software}: Props) {
    return (
        <article style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <img src={`https://shortcuts.api.pierre-jehan.com/${software.logo.contentUrl}`} alt={software.name} style={{ height: "35px" }}/>
            <h3>{software.name}</h3>
        </article>
    );
}