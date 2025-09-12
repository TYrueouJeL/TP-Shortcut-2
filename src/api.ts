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

export interface NewCategory {
    name: string;
}

export interface Category extends Resource, NewCategory {
    "@type": "Category";
}

export interface NewSoftware {
    name: string;
    logo?: MediaObject;
}

export interface Software extends Resource, NewSoftware {
    "@type": "Software";
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

export async function createResource<T, U>(slug: ResourceSlug, resource: T): Promise<U> {
    const response = await fetch(`https://shortcuts.api.pierre-jehan.com/${slug}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(resource)
    });
    const data: U = await response.json();
    return data;
}
