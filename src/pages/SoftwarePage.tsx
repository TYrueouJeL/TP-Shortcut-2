import { useEffect, useState } from "react";
import { createResource, getCollection } from "../api";
import type { NewSoftware, Software } from "../api";
import SoftwareCard from "../components/SoftwareCard";

export default function SoftwarePage() {
    const [software, setSoftware] = useState<Software[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    async function fetchSoftware() {
        const software = await getCollection<Software>('software');
        setSoftware(software);
        setLoading(false);
    }

    async function handleSubmit(event: React.FormEvent) {
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
            <h1>Liste des logiciels</h1>
            
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={event => setName(event.target.value)} placeholder="Nom du logiciel"/>
                <button type="submit">Ajouter</button>
            </form>

            {softwareCards}
        </section>
    );
}