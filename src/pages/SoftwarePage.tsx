import {type FormEvent, useEffect, useState} from "react";
import { createResource, getCollection } from "../api";
import type { NewSoftware, Software } from "../api";
import SoftwareCard from "../components/software/SoftwareCard.tsx";

export default function SoftwarePage() {
    const [software, setSoftware] = useState<Software[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    async function fetchSoftware() {
        const software = await getCollection<Software>('software');
        setSoftware(software);
        setLoading(false);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const newSoftware = await createResource<NewSoftware, Software>('software', { name: name });
        setSoftware([ newSoftware, ...software ]);
        setName('');
    }

    useEffect(() => {
        setLoading(true);
        fetchSoftware();
    }, [])

    let softwareCards = null;
    if (loading) {
        softwareCards = <p>Chargement en cours...</p>;
    } else {
        softwareCards = software.map(s => <SoftwareCard key={s.id} software={s}/>);
    }

    return (
        <section>
            <h1 className={'title'}>Liste des logiciels</h1>

            <form onSubmit={handleSubmit} className="mb-1">
                <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder="Nom du logiciel"/>
                <button type="submit">Ajouter</button>
            </form>

            <div>
                {softwareCards}
            </div>
        </section>
    );
}