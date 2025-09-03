type ResourceType = "Category" | "Software" | "Shortcut" | "MediaObject";
type ResourceSlug = "categories" | "software" | "shortcuts" | "media_objects";

interface Resource {
    "@context": string;
    "@id": string;
    "@type": ResourceType;
    id: number;
}

interface Collection<T> {
    "@context": string;
    "@id": string;
    "@type": "hydra:Collection";
    "hydra:member": T[];
}

export interface Category extends Resource {
    "@type": "Category";
    name: string;
}

export interface Software extends Resource {
    "@type": "Software";
    name: string;
    logo: MediaObject;
}

export interface Shortcut extends Resource {
    "@type": "Shortcut";
    title: string;
    windows: string;
    macos: string;
    linux: string;
    context: string;
    description: string;
    created_at: string;
    software: Software;
    categories: Category[];
}

export interface MediaObject extends Resource {
    "@type": "MediaObject";
    contentUrl: string;
}


export async function getResource<T>(slug: ResourceSlug, id: number): Promise<T> {
    const response = await fetch(`https://shortcuts.api.pierre-jehan.com/${slug}/${id}`);
    const data: T = await response.json();
    return data;
}

export async function getCollection<T>(slug: ResourceSlug): Promise<T[]> {
    const response = await fetch(`https://shortcuts.api.pierre-jehan.com/${slug}`);
    const data: Collection<T> = await response.json();
    return data["hydra:member"];
}
