import type { Software } from "../api";

interface Props {
    software: Software;
}

export default function SoftwareCard({software}: Props) {
    return (
        <article>
            <h3>{software.name}</h3>
        </article>
    );
}