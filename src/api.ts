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

export async function getCollection<T>(slugOrPage: ResourceSlug | number, categoryId?: number): Promise<T[]> {
    if (typeof slugOrPage === "string") {
        const response = await fetch(`https://shortcuts.api.pierre-jehan.com/${slugOrPage}`);
        const data: Collection<T> = await response.json();
        return data["hydra:member"];
    } else if (categoryId === 0) {
        const response = await fetch(`https://shortcuts.api.pierre-jehan.com/shortcuts?page=${slugOrPage}`);
        const data: Collection<T> = await response.json();
        return data["hydra:member"];
    } else {
        const response = await fetch(`https://shortcuts.api.pierre-jehan.com/shortcuts?page=${slugOrPage}&categories.id=${categoryId}`);
        const data: Collection<T> = await response.json();
        return data["hydra:member"];
    }
}

export async function getPages(categoryId: number): Promise<number> {
    if (categoryId === 0) {
        const response = await fetch(`https://shortcuts.api.pierre-jehan.com/shortcuts?`);
        const data = await response.json();
        return Math.ceil(data["hydra:totalItems"] / 6);
    } else {
        const response = await fetch(`https://shortcuts.api.pierre-jehan.com/shortcuts?categories.id=${categoryId}`);
        const data = await response.json();
        return Math.ceil(data["hydra:totalItems"] / 6);
    }
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
